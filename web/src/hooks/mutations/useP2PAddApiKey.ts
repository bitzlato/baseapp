import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { p2pAuthUrl } from 'web/src/api/config';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';

export type ApiKeysParams = {
  active: boolean;
  authorities: {
    canRead: boolean;
    canTrade: boolean;
    canTransfer: boolean;
  };
  key: string;
  name: string;
};

type Input = {
  params: ApiKeysParams;
  twoFACode?: string | null | undefined;
};

type Data = {
  email: string;
};

const P2PAddApiKey = async ({ params, twoFACode }: Input) => {
  const res = await fetchJson(`${p2pAuthUrl()}/keys/`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...(twoFACode === null && { 'X-Code-NO2FA': 'true' }),
      ...(twoFACode && { 'X-Code-2FA': twoFACode }),
    },
    credentials: 'include',
  });

  return res;
};

export const useP2PAddApiKey = () => {
  const dispatch = useDispatch();

  return useMutation<Input, Data>(P2PAddApiKey, {
    throwOnFailure: true,
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        alertFetchError(dispatch, error);
      }
    },
  });
};
