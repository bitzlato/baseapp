import { useMemo } from 'react';
import { p2pUrl } from 'web/src/api/config';
import { P2PCurrencies, P2PCurrencyOption } from 'web/src/modules/public/currencies/types';
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
