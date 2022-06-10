import { p2pUrl } from 'web/src/api/config';
import { useUser } from 'web/src/components/app/AppContext';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { AdvertParams } from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';

export const useFetchP2PLastFilter = () => {
  const user = useUser();

  return useFetch<Partial<AdvertParams>>(
    user ? `${p2pUrl()}/profile/last-filter/` : null,
    fetchWithCreds,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
};
