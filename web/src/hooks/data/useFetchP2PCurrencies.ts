import { useCallback, useMemo } from 'react';
import { p2pUrl } from 'web/src/api/config';
import { P2PCurrencies, P2PCurrencyOption } from 'web/src/modules/public/currencies/types';
import { BaseCurrency } from 'web/src/types/currencies.types';
import { useFetch, FetchResponse } from './useFetch';

export type FiatCurrencies = Record<string, BaseCurrency>;

const DEFAULT_FIAT_MINOR_UNIT = 2;

export const useFetchP2PCurrencies = () => {
  return useFetch<P2PCurrencies>(`${p2pUrl()}/public/refs/currencies`);
};

export const useP2PCurrencyOptions = (): FetchResponse<P2PCurrencyOption[]> => {
  const { data, error } = useFetchP2PCurrencies();

  const options = useMemo((): P2PCurrencyOption[] | undefined => {
    if (!data) {
      return undefined;
    }

    return data.map(
      (p2pCurrency): P2PCurrencyOption => ({
        value: p2pCurrency.code,
        label: p2pCurrency.name,
      }),
    );
  }, [data]);

  return { data: options, error };
};

export const useFiatCurrencies = (): {
  getFiatCurrency: (code: string) => BaseCurrency;
  fiatCurrencies?: FiatCurrencies | undefined;
  error: unknown;
} => {
  const { data, error } = useFetchP2PCurrencies();

  const fiatCurrencies = useMemo(() => {
    if (data) {
      return data.reduce<Record<string, BaseCurrency>>((acc, P2PCurrency) => {
        acc[P2PCurrency.code] = {
          code: P2PCurrency.code,
          name: P2PCurrency.name,
          sign: P2PCurrency.sign,
          minorUnit: DEFAULT_FIAT_MINOR_UNIT,
        };

        return acc;
      }, {});
    }

    return undefined;
  }, [data]);
  const getFiatCurrency = useCallback(
    (code: string): BaseCurrency =>
      fiatCurrencies?.[code] ?? {
        code,
        name: code,
        sign: code,
        minorUnit: DEFAULT_FIAT_MINOR_UNIT,
      },
    [fiatCurrencies],
  );

  return { getFiatCurrency, fiatCurrencies, error };
};
