import { authUrl } from 'web/src/api/config';
import { fetchMutation } from 'web/src/helpers/fetch';
import { useFetchMutation } from 'web/src/hooks/mutations/useFetchMutation';
import { User } from 'web/src/modules/user/profile/types';

export interface SignInValues {
  email: string;
  password: string;
  otp_code?: string | undefined;
  captcha_response?: string | undefined;
}

export const useSignIn = () =>
  useFetchMutation<SignInValues, User>(`${authUrl()}/identity/sessions`, fetchMutation, {
    onFailure: () => {}, // disable handleFetchError
  });
