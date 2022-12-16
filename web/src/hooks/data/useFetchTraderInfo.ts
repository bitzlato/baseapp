import { p2pUrl } from 'web/src/api/config';
import { fetchJson, fetchWithCreds } from 'web/src/helpers/fetch';
import { useIsUserActivated } from 'web/src/components/app/UserContext';
import { UserInfo } from 'web/src/modules/p2p/user.types';
import { useFetch } from './useFetch';

export const useFetchTraderInfo = (publicName?: string | undefined) => {
  const isUserActivated = useIsUserActivated();

  return useFetch<UserInfo>(
    publicName ? `${p2pUrl()}${!isUserActivated ? '/public' : ''}/userinfo/${publicName}` : null,
    isUserActivated ? fetchWithCreds : fetchJson,
  );
};
