import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { authUrl } from 'web/src/api/config';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { UserProfile } from 'web/src/modules';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { userRefetch } from 'web/src/modules/user/profile/actions';

const saveCashContractProfile =
  (type: 'create' | 'update') => async (data: Partial<UserProfile>) => {
    const response = await fetchWithCreds(`${authUrl()}/resource/profiles`, {
      method: type === 'create' ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return response;
  };

export const useSaveCashContractProfile = (type: 'create' | 'update') => {
  const dispatch = useDispatch();
  return useMutation<Partial<UserProfile>, any, unknown>(saveCashContractProfile(type), {
    throwOnFailure: true,
    onSuccess: () => {
      dispatch(userRefetch());
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        dispatch(
          alertPush({
            type: 'error',
            code: error.code,
            message: error.messages,
            payload: error.payload,
          }),
        );
      }
    },
  });
};
