import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { authUrl } from 'web/src/api';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';
import { alertPush } from 'web/src/modules/public/alert/actions';

interface ChangePasswordInput {
  email: string;
  captcha_response?: string;
}

const changePassword = async (params: ChangePasswordInput) => {
  const res = await fetchJson(`${authUrl()}/identity/users/password/generate_code`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return res;
};

export const useChangePassword = ({
  onRequestSuccess,
}: {
  onRequestSuccess?: (() => void) | undefined;
} = {}) => {
  const dispatch = useDispatch();
  return useMutation<ChangePasswordInput, any, unknown>(changePassword, {
    onSuccess: () => {
      dispatch(
        alertPush({
          type: 'success',
          message: ['Password reset email sent'],
        }),
      );

      onRequestSuccess?.();
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
