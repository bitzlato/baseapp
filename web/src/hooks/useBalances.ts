import { useMemo } from 'react';
import { USD_CCY } from 'web/src/helpers/money';
import { useMarketBalances } from 'web/src/hooks/useMarketBalances';
import { useP2PBalances } from 'web/src/hooks/useP2PBalances';
import { Balance } from 'web/src/types/balances.types';

const DEFAULT_FIAT_CURRENCY_CODE = USD_CCY.code;
const DEFAULT_FIAT_CURRENCY = USD_CCY;

export const useBalances = (): Balance[] | undefined => {
  const marketBalances = useMarketBalances();
  const p2pBalances = useP2PBalances(DEFAULT_FIAT_CURRENCY_CODE);

  return useMemo(() => {
    if (!marketBalances || !p2pBalances) {
      return undefined;
    }

    const balancesMap = marketBalances.reduce<Record<string, Balance>>((acc, marketBalance) => {
      const { apiCurrency } = marketBalance.currency;

      acc[marketBalance.currency.code] = {
        name: marketBalance.currency.name,
        cryptoCurrency: marketBalance.currency,
        marketCurrency: marketBalance.currency,
        totalBalance: marketBalance.balance,
        totalBalanceInFiat:
          apiCurrency && marketBalance.balance.convert(apiCurrency.price, DEFAULT_FIAT_CURRENCY),
        marketBalance,
        features: {
          transfer: false,
          gift: false,
          changeRate: false,
        },
      };

      return acc;
    }, {});

    p2pBalances.forEach((p2pBalance) => {
      const balance = balancesMap[p2pBalance.cryptocurrency.code];
      if (balance) {
        balancesMap[p2pBalance.cryptocurrency.code] = {
          ...balance,
          p2pCryptoCurrency: p2pBalance.cryptocurrency,
          totalBalance: balance.totalBalance
            ? balance.totalBalance.add(p2pBalance.balance)
            : p2pBalance.balance,
          totalBalanceInFiat: balance.totalBalanceInFiat
            ? balance.totalBalanceInFiat.add(p2pBalance.worth.value)
            : p2pBalance.worth.value,
          p2pBalance,
          features: {
            transfer: true,
            gift: true,
            changeRate: true,
          },
        };
      } else {
        balancesMap[p2pBalance.cryptocurrency.code] = {
          name: p2pBalance.cryptocurrency.code,
          cryptoCurrency: p2pBalance.cryptocurrency,
          p2pCryptoCurrency: p2pBalance.cryptocurrency,
          totalBalance: p2pBalance.balance,
          totalBalanceInFiat: p2pBalance.worth.value,
          p2pBalance,
          features: {
            transfer: false,
            gift: true,
            changeRate: true,
          },
        };
      }
    });

    return Object.values(balancesMap).sort((a, b) => {
      if (a.features.transfer !== b.features.transfer) {
        return a.features.transfer === true ? -1 : 1;
      }

      return 0;
    });
  }, [marketBalances, p2pBalances]);
};
