import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pAuthUrl } from 'web/src/api/config';
import { fetchJson } from 'web/src/helpers/fetch';

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

export const useP2PDeleteApiKey = () => {
  const { mutate } = useSWRConfig();

  return useMutation(P2PDeleteApiKey, {
    onSuccess: () => mutate(`${p2pAuthUrl()}/keys/usr`),
  });
};
