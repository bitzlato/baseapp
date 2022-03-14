import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useSWR, { BareFetcher, Key } from 'swr';
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

export const useFetch = <Data>(key: Key, fetcher: BareFetcher<Data> = fetchJson) => {
  const dispatch = useDispatch();
  const swr = useSWR(key, fetcher);

  useEffect(() => {
    alertFetchError(dispatch, swr.error);
  }, [dispatch, swr.error]);

  return swr;
};
