import { useMemo } from 'react';
import { p2pUrl } from 'web/src/api/config';
import { fetcher } from 'web/src/helpers/fetcher';
import { P2PCurrencies, P2PCurrencyOption } from 'web/src/modules/public/currencies/types';
import { useFetcher, FetcherResponse } from './useFetcher';

export const useFetchP2PCurrencies = () => {
  return useFetcher<P2PCurrencies>(`${p2pUrl()}/public/refs/currencies`, fetcher);
};

export const useP2PCurrencyOptions = (): FetcherResponse<P2PCurrencyOption[]> => {
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
