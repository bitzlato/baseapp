import { useDispatch } from 'react-redux';
import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';
import { buildQueryString } from 'web/src/helpers';

const P2PDeleteAddressFromNotebook = async (addressId: number) => {
  const res = await fetchJson(`${p2pUrl()}/profile/addresses/${addressId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return res;
};

export const useP2PDeleteAddressFromNotebook = ({ cryptocurrency }: { cryptocurrency: string }) => {
  const { mutate } = useSWRConfig();
  const dispatch = useDispatch();

  return useMutation(P2PDeleteAddressFromNotebook, {
    onSuccess: () => {
      dispatch(alertPush({ message: ['address.deleted'], type: 'success' }));
      mutate(`${p2pUrl()}/profile/addresses/?${buildQueryString({ cryptocurrency })}`);
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        alertFetchError(dispatch, error);
      }
    },
  });
};
