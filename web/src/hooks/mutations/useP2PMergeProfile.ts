import { useDispatch } from 'react-redux';
import useMutation, { Options } from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { userRefetch } from 'web/src/modules/user/profile/actions';

interface Input {
  token: string;
  otp?: string | undefined;
}

const mergeProfile = async ({ token, otp }: Input) => {
  const response = await fetchWithCreds(`${p2pUrl()}/profile/merge`, {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...(otp && { 'X-Code-2FA': otp }),
    },
  });

  return response;
};

export const useP2PMergeProfile = (options?: Options<Input, any, any> | undefined) => {
  const dispatch = useDispatch();

  return useMutation(mergeProfile, {
    ...options,
    onSuccess: (params) => {
      dispatch(userRefetch());

      options?.onSuccess?.(params);
    },
  });
};
