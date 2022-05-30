import { useSelector } from 'react-redux';
import { p2pUrl } from 'web/src/api/config';
import { fetchJson, fetchWithCreds } from 'web/src/helpers/fetch';
import { selectUserLoggedIn } from '../modules';
import { useFetch } from './data/useFetch';

export const useUserInfo = (publicName: string) => {
  const userLoggedIn = useSelector(selectUserLoggedIn);

  const fetchUrl = userLoggedIn
    ? `${p2pUrl()}/userinfo/${publicName}`
    : `${p2pUrl()}/public/userinfo/${publicName}`;

  const response = useFetch(fetchUrl, userLoggedIn ? fetchWithCreds : fetchJson);

  return response;
};
