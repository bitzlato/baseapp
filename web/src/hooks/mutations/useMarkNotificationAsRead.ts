import { useDispatch } from 'react-redux';
import { useSWRConfig } from 'swr';
import useMutation, { Options } from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { fetchJson, FetchError } from 'web/src/helpers/fetch';

const markNotificationAsRead = async (notificationId: number) => {
  const response = await fetchJson(`${p2pUrl()}/notifications/${notificationId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useMarkNotificationAsRead = (options: Options<number, any, any> = {}) => {
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();

  return useMutation(markNotificationAsRead, {
    ...options,
    onSuccess: () => {
      mutate(`${p2pUrl}/notifications/`);
    },
    onFailure: (params) => {
      const { error } = params;
      if (error instanceof FetchError) {
        alertFetchError(dispatch, error);
      }

      options.onFailure?.(params);
    },
  });
};
