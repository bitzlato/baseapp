import useSWR, { BareFetcher, Key, SWRConfiguration } from 'swr';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { fetchJson } from 'web/src/helpers/fetch';

export type FetchResponse<Data, Error = unknown> =
  | {
      data: Data;
      error: undefined;
    }
  | {
      data: undefined;
      error: undefined;
    }
  | {
      data: undefined;
      error: Error;
    };

export const useFetch = <Data = any, Error = any>(
  key: Key,
  fetcher: BareFetcher<Data> | null = fetchJson,
  config?: SWRConfiguration<Data, Error, BareFetcher<Data>> | undefined,
) => {
  const handleFetchError = useHandleFetchError();

  return useSWR(key, fetcher, {
    ...config,
    onError: (...args) => {
      config?.onError?.(...args);

      handleFetchError(args[0]);
    },
  });
};
