import { p2pUrl } from 'web/src/api/config';
import { fetchJson, fetchWithCreds } from 'web/src/helpers/fetch';
import { useUser } from 'web/src/components/app/UserContext';
import { UserInfo } from 'web/src/modules/p2p/user.types';
import { useFetch } from './useFetch';

export const useFetchTraderInfo = (publicName?: string | undefined) => {
  const user = useUser();
  const userLoggedIn = user !== undefined;

  return useFetch<UserInfo>(
    publicName ? `${p2pUrl()}${!userLoggedIn ? '/public' : ''}/userinfo/${publicName}` : null,
    userLoggedIn ? fetchWithCreds : fetchJson,
  );
};
