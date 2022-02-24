import { Currency, Money } from '@bitzlato/money-js';
import { WalletItemData } from 'src/components/WalletItem/WalletItem';
import { createCcy, createMoney, PENCE_CCY } from 'src/helpers/money';
import { GeneralBalance } from 'src/modules/account/types';
import { Wallet } from 'src/modules/user/wallets/types';
import { getCurrencySymbol } from 'web/src/helpers/getCurrencySymbol';

export function getList(wallets: Wallet[], balances: GeneralBalance[]): WalletItemData[] {
  const res: WalletItemData[] = [];

  for (let i = 0; i < wallets.length; i++) {
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
      hasTransfer: balance !== undefined && balance.p2p_balance !== null,
      index: i,
    });
  }

  // add p2p only currencies
  for (let i = 0; i < balances.length; i++) {
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
          hasTransfer: false,
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
