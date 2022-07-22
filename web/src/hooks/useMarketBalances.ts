import { useMemo } from 'react';
import { createMoney, USD_CCY } from 'web/src/helpers/money';
import { useFetchBalances } from 'web/src/hooks/data/peatio/useFetchBalances';
import { useMarketCurrencies } from 'web/src/hooks/useMarketCurrencies';
import { AccountBalanceSource } from 'web/src/modules/public/accounts/types';
import { MarketBalance } from 'web/src/types/balances.types';
import { MarketCurrency } from 'web/src/types/currencies.types';

const createMarketBalance = (
  source: AccountBalanceSource,
  currency: MarketCurrency,
): MarketBalance => {
  return {
    ...source,
    currency,
    balance: createMoney(source.balance, currency),
    locked: createMoney(source.locked, currency),
    limit_24_hour: createMoney(source.limit_24_hour, USD_CCY),
    limit_1_month: createMoney(source.limit_1_month, USD_CCY),
  };
};

export const useMarketBalances = (): MarketBalance[] | undefined => {
  const { getMarketCurrency } = useMarketCurrencies();
  const { data: balances } = useFetchBalances();

  return useMemo(
    () =>
      balances?.map((source) =>
        createMarketBalance(source, getMarketCurrency(source.currency.toUpperCase())),
      ),
    [balances, getMarketCurrency],
  );
};
