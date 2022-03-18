import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { userRefetch } from 'web/src/modules/user/profile/actions';

const mergeProfile = async (token: string) => {
  const response = await fetchWithCreds(`${p2pUrl()}/profile/merge`, {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'x-code-no2fa': 'true', // TODO: use p2p 2FA
    },
  });

  return response;
};

export const useMergeProfile = () => {
  const dispatch = useDispatch();
  return useMutation(mergeProfile, {
    onSuccess: () => {
      dispatch(userRefetch());
    },
    onFailure: ({ error }) => {
      alertFetchError(dispatch, error);
    },
  });
};
