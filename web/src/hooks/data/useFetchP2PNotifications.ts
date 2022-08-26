import { p2pUrl } from 'web/src/api/config';
import { fetchJson, fetchWithCreds } from 'web/src/helpers/fetch';
import { Notification } from 'web/src/lib/socket/types';
import { PaymethodSource } from 'web/src/modules/p2p/types';
import { Language } from 'web/src/types';
import { useFetch } from './useFetch';

export const useFetchP2PNotifications = (isLoggedIn: boolean, lang: Language) => {
  return useFetch<Notification[]>(
    isLoggedIn ? `${p2pUrl()}/notifications/` : null,
    async (url: string): Promise<Notification[]> => {
      const notifications = (await fetchWithCreds(url)) as Notification[];

      return Promise.all(
        notifications.map(async (item) => {
          if ('paymethodId' in item.data && item.data.paymethodId !== null) {
            const paymethod = (await fetchJson(
              `${p2pUrl()}/public/refs/paymethods/${item.data.paymethodId}?lang=${lang}`,
            )) as PaymethodSource;

            return {
              ...item,
              data: {
                ...item.data,
                paymethodName: paymethod.description,
              },
            };
          }

          return item;
        }),
      );
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );
};
