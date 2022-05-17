import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { UserInfo } from 'web/src/modules/p2p/user.types';
import { useFetch } from './useFetch';

export const useFetchUser = (name: string | undefined) => {
  return useFetch<UserInfo>(
    name === undefined ? null : `${p2pUrl()}/public/userinfo/${name}`,
    fetchWithCreds,
  );
};
