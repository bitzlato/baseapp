import { p2pUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { PaymethodSource } from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';

export const useFetchPaymethod = (id: string | number | undefined, lang: string) => {
  return useFetch<PaymethodSource>(
    id === undefined
      ? null
      : `${p2pUrl()}/public/refs/paymethods/${id}?${buildQueryString({ lang })}`,
    fetchWithCreds,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      errorRetryCount: 0,
    },
  );
};
