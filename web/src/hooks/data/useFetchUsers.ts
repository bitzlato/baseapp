import { useDispatch } from 'react-redux';
import { authUrl } from 'web/src/api/config';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { userRefetch } from 'web/src/modules/user/profile/actions';
import { ConfirmCodeParams } from 'web/src/modules/user/profile/types';

export const useConfirmCode = () => {
  const dispatch = useDispatch();
  return async (params: ConfirmCodeParams): Promise<boolean> => {
    try {
      await fetchWithCreds(`${authUrl()}/resource/users/email/confirm_code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      dispatch(
        alertPush({
          message: ['success.email.confirmed'],
          type: 'success',
        }),
      );
      dispatch(userRefetch());
      return true;
    } catch (error) {
      alertFetchError(dispatch, error);
    }
    return false;
  };
};
