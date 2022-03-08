import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useSWR, { SWRHook } from 'swr';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { FetcherError } from 'web/src/helpers/fetcher';

export type FetcherResponse<Data = any, Error = unknown> =
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

export const useFetcher = ((...args: Parameters<SWRHook>) => {
  const dispatch = useDispatch();
  const swr = useSWR(...args);

  useEffect(() => {
    if (swr.error instanceof FetcherError) {
      dispatch(
        alertPush({
          type: 'error',
          code: swr.error.code,
          message: swr.error.messages,
          payload: swr.error.payload,
        }),
      );
    }
  }, [dispatch, swr.error]);

  return swr;
}) as SWRHook;
