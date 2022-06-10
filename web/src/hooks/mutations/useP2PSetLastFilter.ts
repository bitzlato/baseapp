import useMutation, { Options } from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';
import { AdvertParams } from 'web/src/modules/p2p/types';

const P2PSetLastFilter = async (params: Partial<AdvertParams>) => {
  const res = await fetchJson(`${p2pUrl()}/profile/last-filter/`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return res;
};

export const useP2PSetLastFilter = (options: Options<Partial<AdvertParams>, any, any> = {}) => {
  const handleFetchError = useHandleFetchError();

  return useMutation(P2PSetLastFilter, {
    ...options,
    onFailure: (params) => {
      const { error } = params;
      if (error instanceof FetchError) {
        handleFetchError(error);
      }

      options.onFailure?.(params);
    },
  });
};
