import { useDispatch } from 'react-redux';
import { useSWRConfig } from 'swr';
import useMutation, { Options } from 'use-mutation';
import { p2pAuthUrl } from 'web/src/api/config';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';

const P2PDeleteApiKey = async (kid: number) => {
  const res = await fetchJson(`${p2pAuthUrl()}/keys/usr/${kid}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return res;
};

export const useP2PDeleteApiKey = (options: Options<number, any, any> = {}) => {
  const { mutate } = useSWRConfig();
  const dispatch = useDispatch();

  return useMutation(P2PDeleteApiKey, {
    ...options,
    onSuccess: (params) => {
      mutate(`${p2pAuthUrl()}/keys/usr`);

      options.onSuccess?.(params);
    },
    onFailure: (params) => {
      const { error } = params;
      if (error instanceof FetchError) {
        alertFetchError(dispatch, error);
      }

      options.onFailure?.(params);
    },
  });
};
