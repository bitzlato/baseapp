import { useMemo } from 'react';
import { FetchResponse } from 'web/src/hooks/data/useFetch';
import { useFetchP2PCurrencies } from 'web/src/hooks/data/p2p/useFetchP2PCurrencies';
import { P2PCurrencyOption } from 'web/src/modules/public/currencies/types';

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
