import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { authUrl } from 'web/src/api';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';
import { alertPush } from 'web/src/modules/public/alert/actions';

interface ChangePasswordInput {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const changePassword = async (params: ChangePasswordInput) => {
  const res = await fetchJson(`${authUrl()}/resource/users/password`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return res;
};

export const useChangePassword = ({
  onSuccess,
}: {
  onSuccess?: (() => void) | undefined;
} = {}) => {
  const dispatch = useDispatch();

  return useMutation(changePassword, {
    onSuccess: () => {
      onSuccess?.();
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
