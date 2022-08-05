import { useSelector } from 'react-redux';
import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { selectUserLoggedIn } from 'web/src/modules';
import { Notification } from 'web/src/lib/socket/types';
import { useFetch } from './useFetch';

export const useFetchP2PNotifications = () => {
  const isLogged = useSelector(selectUserLoggedIn);

  return useFetch<Array<Notification>>(
    isLogged ? `${p2pUrl()}/notifications/` : null,
    fetchWithCreds,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );
};
