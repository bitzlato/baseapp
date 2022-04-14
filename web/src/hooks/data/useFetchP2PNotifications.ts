import { useSelector } from 'react-redux';
import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { selectUserLoggedIn } from 'web/src/modules';
import { useFetch } from './useFetch';

export const useFetchP2PNotifications = () => {
  const isLogged = useSelector(selectUserLoggedIn);

  return useFetch(isLogged ? `${p2pUrl()}/notifications/` : null, fetchWithCreds, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
};
