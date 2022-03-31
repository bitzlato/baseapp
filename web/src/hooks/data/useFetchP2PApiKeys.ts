import { p2pAuthUrl } from 'web/src/api/config';
import { P2PApiKey } from 'web/src/modules/user/apiKeys/types';
import { useFetch } from './useFetch';

export const useFetchP2PApiKeys = () => {
  return useFetch<ReadonlyArray<P2PApiKey>>(`${p2pAuthUrl()}/keys/usr`);
};
