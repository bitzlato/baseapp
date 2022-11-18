import { p2pUrl } from 'web/src/api/config';
import { fetchMutation } from 'web/src/helpers/fetch';
import { FetcherMutationFn, useFetchMutation } from 'web/src/hooks/mutations/useFetchMutation';

const fetcher: FetcherMutationFn = (url, config) =>
  fetchMutation(url, {
    ...config,
    method: 'DELETE',
  });

export const useMarkAllNotificationsAsRead = () =>
  useFetchMutation<undefined>(`${p2pUrl()}/api/p2p/notifications/all`, fetcher);
