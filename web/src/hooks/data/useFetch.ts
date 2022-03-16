import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useSWR, { BareFetcher, Key, SWRConfiguration } from 'swr';
import { fetchJson } from 'web/src/helpers/fetch';
import { alertFetchError } from 'web/src/helpers/alertFetchError';

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
  const dispatch = useDispatch();
  const swr = useSWR(key, fetcher, config);

  useEffect(() => {
    alertFetchError(dispatch, swr.error);
  }, [dispatch, swr.error]);

  return swr;
};