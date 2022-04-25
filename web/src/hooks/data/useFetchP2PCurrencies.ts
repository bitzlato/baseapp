import { useCallback, useMemo } from 'react';
import { p2pUrl } from 'web/src/api/config';
import { P2PCurrencies, P2PCurrencyOption } from 'web/src/modules/public/currencies/types';
import { MoneyCurrency } from 'web/src/types';
import { useFetch, FetchResponse } from './useFetch';

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
  getFiatCurrency: (code: string) => MoneyCurrency;
  fiatCurrencies: Record<string, MoneyCurrency>;
} => {
  const { data } = useFetchP2PCurrencies();

  const fiatCurrencies = useMemo(() => {
    if (data) {
      return data.reduce<Record<string, MoneyCurrency>>((acc, P2PCurrency) => {
        acc[P2PCurrency.code] = {
          code: P2PCurrency.code,
          name: P2PCurrency.name,
          sign: P2PCurrency.sign,
          minorUnit: 2,
        };

        return acc;
      }, {});
    }

    return {};
  }, [data]);
  const getFiatCurrency = useCallback(
    (code: string): MoneyCurrency => {
      const maybeMoneyCurrency = fiatCurrencies[code];

      return (
        maybeMoneyCurrency ?? {
          code,
          name: code,
          sign: code,
          minorUnit: 2,
        }
      );
    },
    [fiatCurrencies],
  );

  return { getFiatCurrency, fiatCurrencies };
};
