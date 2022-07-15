import { useCallback, useMemo } from 'react';
import { createCcy, createMoney } from 'web/src/helpers/money';
import { useFetchCurrencies } from 'web/src/hooks/data/peatio/useFetchCurrencies';
import { CurrencySource } from 'web/src/modules/public/currencies/types';
import { MarketCurrencies, MarketCurrency } from 'web/src/types/currencies.types';

const DEFAULT_MARKET_CURRENCY_MINOR_UNIT = 8;

const createMarketCurrency = (source: CurrencySource): MarketCurrency => {
  const moneyCurrency = createCcy(source.id.toUpperCase(), source.precision);

  return {
    ...moneyCurrency,
    name: source.name,
    sign: moneyCurrency.code,
    apiCurrency: {
      ...source,
      deposit_fee: createMoney(source.deposit_fee, moneyCurrency),
      min_withdraw_amount: createMoney(source.min_withdraw_amount, moneyCurrency),
      blockchain_currencies: source.blockchain_currencies.map((item) => ({
        blockchain_id: item.blockchain_id,
        withdraw_fee: createMoney(item.withdraw_fee, moneyCurrency),
        min_deposit_amount: createMoney(item.min_deposit_amount, moneyCurrency),
      })),
    },
  };
};

export const useMarketCurrencies = (): {
  getMarketCurrency: (code: string) => MarketCurrency;
  marketCurrencies?: MarketCurrencies | undefined;
} => {
  const { data } = useFetchCurrencies();

  const marketCurrencies = useMemo(
    () =>
      data &&
      data.reduce<Record<string, MarketCurrency>>((acc, item) => {
        acc[item.id.toUpperCase()] = createMarketCurrency(item);

        return acc;
      }, {}),
    [data],
  );
  const getMarketCurrency = useCallback(
    (code: string): MarketCurrency =>
      marketCurrencies?.[code] ?? {
        code,
        name: code,
        sign: code,
        minorUnit: DEFAULT_MARKET_CURRENCY_MINOR_UNIT,
      },
    [marketCurrencies],
  );

  return { getMarketCurrency, marketCurrencies };
};
