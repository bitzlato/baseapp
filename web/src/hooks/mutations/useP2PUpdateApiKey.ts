import { useDispatch } from 'react-redux';
import { useSWRConfig } from 'swr';
import useMutation, { Options } from 'use-mutation';
import { p2pAuthUrl } from 'web/src/api/config';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';
import { P2PApiKey } from 'web/src/modules/user/apiKeys/types';

type Input = {
  params: P2PApiKey;
  twoFACode: string;
};

const P2PUpdateApiKey = async ({ params, twoFACode }: Input) => {
  const res = await fetchJson(`${p2pAuthUrl()}/keys/usr/${params.kid}`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...(twoFACode && { 'X-Code-2FA': twoFACode }),
    },
    credentials: 'include',
  });

  return res;
};

export const useP2PUpdateApiKey = (options: Options<Input, any, any> = {}) => {
  const { mutate } = useSWRConfig();
  const dispatch = useDispatch();

  return useMutation(P2PUpdateApiKey, {
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
