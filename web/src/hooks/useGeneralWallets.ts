import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Currency, Money } from '@bitzlato/money-js';
import { accountUrl, p2pUrl, showGift } from 'src/api/config';
import { GeneralBalance } from 'src/modules/account/types';
import { selectWallets } from 'src/modules/user/wallets/selectors';
import { WalletItemData } from 'src/components/WalletItem/WalletItem';
import { createCcy, createMoney, PENCE_CCY } from 'src/helpers/money';
import { Wallet } from 'src/modules/user/wallets/types';
import { getCurrencySymbol } from 'web/src/helpers/getCurrencySymbol';
import { fetchWithCreds } from '../helpers/fetch';
import { isPendingUser } from '../modules/user/profile/selectors';
import { useFetch } from './data/useFetch';
import { useWalletsFetch } from './useWalletsFetch';

function getBalance(ccy: Currency, balance: GeneralBalance): Money {
  let m = createMoney(0, ccy);
  if (balance.market_balance !== null) {
    m = m.add(createMoney(balance.market_balance, ccy));
  }
  if (balance.p2p_balance !== null) {
    m = m.add(createMoney(balance.p2p_balance, ccy));
  }
  return m;
}

function getLocked(ccy: Currency, balance: GeneralBalance): Money {
  let m = createMoney(0, ccy);
  if (balance.market_hold !== null) {
    m = m.add(createMoney(balance.market_hold, ccy));
  }
  if (balance.p2p_hold !== null) {
    m = m.add(createMoney(balance.p2p_hold, ccy));
  }
  return m;
}

function getList(wallets: Wallet[], balances: GeneralBalance[]): WalletItemData[] {
  const res: WalletItemData[] = [];
  const isShowGift = showGift();

  for (let i = 0; i < wallets.length; i += 1) {
    const wallet = wallets[i]!;
    const ccy = wallet.currency;
    const currencyId = getCurrencySymbol(ccy);
    const balance = balances.find((d) => currencyId === d.currency_id);
    const balanceTotal = balance ? getBalance(ccy, balance) : wallet.balance;
    res.push({
      name: wallet.name,
      currency: ccy.code,
      balanceTotal,
      balanceP2P: balance?.p2p_balance ? createMoney(balance.p2p_balance, ccy) : undefined,
      balanceMarket: balance?.market_balance
        ? createMoney(balance.market_balance, ccy)
        : wallet.balance,
      locked: balance ? getLocked(ccy, balance) : wallet.locked,
      approximate: createMoney(wallet.price, PENCE_CCY).multiply(balanceTotal.toString()),
      hasDepositWithdraw: true,
      hasTransfer: balance !== undefined && balance.p2p_balance !== null,
      hasGift: isShowGift && balance !== undefined,
      index: i,
    });
  }

  // add p2p only currencies
  for (let i = 0; i < balances.length; i += 1) {
    const balance = balances[i]!;
    if (balance.market_balance == null) {
      const currencyId = balance.currency_id;
      const wallet = wallets.find((d) => getCurrencySymbol(d.currency) === currencyId);
      if (!wallet && balance.p2p_balance && balance.p2p_hold) {
        res.push({
          name: currencyId,
          currency: currencyId,
          balanceTotal: createMoney(balance.p2p_balance, createCcy(currencyId, 8)),
          balanceP2P: createMoney(balance.p2p_balance, createCcy(currencyId, 8)),
          balanceMarket: undefined,
          locked: createMoney(balance.p2p_hold, createCcy(currencyId, 8)),
          approximate: createMoney(0, PENCE_CCY),
          hasDepositWithdraw: false,
          hasTransfer: false,
          hasGift: isShowGift,
          index: wallets.length + i,
        });
      }
    }
  }

  return res.sort((a, b) => {
    if (a.hasTransfer !== b.hasTransfer) {
      return Number(b.hasTransfer) - Number(a.hasTransfer);
    }
    return a.index - b.index;
  });
}

export function useGeneralWallets() {
  useWalletsFetch();
  const wallets = useSelector(selectWallets);
  const isPending = useSelector(isPendingUser);

  const shouldFetch = process.env.REACT_APP_RELEASE_STAGE !== 'sandbox' && !isPending;

  const response = useFetch<GeneralBalance[]>(
    shouldFetch ? `${accountUrl()}/balances` : null,
    fetchWithCreds,
  );

  useEffect(() => {
    // by default new users does not have p2p wallet, create them
    if (response.data?.length === 0) {
      fetchWithCreds(`${p2pUrl()}/wallets/v2/`).then(() => response.mutate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.data]);

  return useMemo(() => {
    if (wallets.length && response.data?.length) {
      return getList(wallets, response.data);
    }
    return [];
  }, [wallets, response.data]);
}
