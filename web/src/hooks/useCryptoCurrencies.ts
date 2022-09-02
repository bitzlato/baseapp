import { useMarketCurrencies } from 'web/src/hooks/useMarketCurrencies';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { BaseCurrency } from 'web/src/types/currencies.types';

export const useCryptoCurrencies = (): ReadonlyArray<BaseCurrency> | undefined => {
  const { marketCurrencies } = useMarketCurrencies();
  const { cryptoCurrencies } = useP2PCryptoCurrencies();

  if (!marketCurrencies || !cryptoCurrencies) {
    return undefined;
  }

  const allCryptoCurrencies = Object.keys(marketCurrencies).reduce<Array<BaseCurrency>>(
    (acc, key) => {
      const cryptoCurrency = marketCurrencies[key];
      if (cryptoCurrency) {
        acc.push(cryptoCurrency);
      }

      return acc;
    },
    [],
  );

  return Object.keys(cryptoCurrencies).reduce<Array<BaseCurrency>>((acc, key) => {
    const cryptoCurrency = cryptoCurrencies[key];
    if (cryptoCurrency && !marketCurrencies[key]) {
      acc.push(cryptoCurrency);
    }

    return acc;
  }, allCryptoCurrencies);
};
