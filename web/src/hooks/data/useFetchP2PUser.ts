import { useDispatch } from 'react-redux';
import { useSWRConfig } from 'swr';
import { p2pUrl } from 'web/src/api/config';
import { useUser } from 'web/src/components/app/AppContext';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { TrustParams, UserInfo } from 'web/src/modules/p2p/user.types';
import { useFetch } from './useFetch';

export const useFetchUser = (name: string | undefined) => {
  const user = useUser();
  return useFetch<UserInfo>(
    name === undefined ? null : `${p2pUrl()}/${user == null ? 'public/' : ''}userinfo/${name}`,
    fetchWithCreds,
  );
};

export const useChangeTrust = () => {
  const { mutate } = useSWRConfig();
  const dispatch = useDispatch();
  return async (name: string, params: TrustParams): Promise<void> => {
    try {
      await fetchWithCreds(`${p2pUrl()}/userinfo/${name}/trust`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      mutate(`${p2pUrl()}/userinfo/${name}`);
    } catch (error) {
      alertFetchError(dispatch, error);
    }
  };
};
