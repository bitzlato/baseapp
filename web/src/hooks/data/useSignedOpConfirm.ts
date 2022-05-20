import { p2pAuthUrl } from 'web/src/api';
import { fetchJson } from 'web/src/helpers/fetch';
import { useFetch } from './useFetch';

export const useSignedOpConfirm = (token: string) => {
  return useFetch(`${p2pAuthUrl()}/signed-ops/confirm?token=${token}`, fetchJson, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 0,
  });
};
