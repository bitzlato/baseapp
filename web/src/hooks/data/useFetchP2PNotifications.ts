import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { Notification } from 'web/src/lib/socket/types';
import { useFetch } from './useFetch';

export const useFetchP2PNotifications = (isLoggedIn: boolean) => {
  return useFetch<Notification[]>(
    isLoggedIn ? `${p2pUrl()}/notifications/` : null,
    fetchWithCreds,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );
};
