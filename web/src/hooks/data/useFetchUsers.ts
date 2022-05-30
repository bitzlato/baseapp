import { useDispatch } from 'react-redux';
import { authUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { userRefetch } from 'web/src/modules/user/profile/actions';
import { ConfirmCodeParams } from 'web/src/modules/user/profile/types';

export const useConfirmCode = () => {
  const dispatch = useDispatch();
  const handleFetchError = useHandleFetchError();

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
      handleFetchError(error);
    }
    return false;
  };
};
