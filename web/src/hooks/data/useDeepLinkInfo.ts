import { accountUrl } from 'web/src/api';
import { fetchJson } from 'web/src/helpers/fetch';
import { useFetch } from './useFetch';

export const useDeepLinkInfo = (deeplinkId: string) => {
  const { data, error, isValidating } = useFetch(
    `${accountUrl()}/deeplinks/${deeplinkId}`,
    fetchJson,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    deeplink: data,
    isLoading: isValidating,
    isError: error,
  };
};
