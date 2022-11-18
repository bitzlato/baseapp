import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { Notification } from 'web/src/lib/socket/types';
import { useFetch } from './useFetch';

export const getNotificationsEndpoint = () => `${p2pUrl()}/notifications/`;

export const useFetchP2PNotifications = (isLoggedIn: boolean) => {
  return useFetch<Notification[]>(isLoggedIn ? getNotificationsEndpoint() : null, fetchWithCreds, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
};
