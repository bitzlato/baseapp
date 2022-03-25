import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { fetchJson, FetchError } from 'web/src/helpers/fetch';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { userRefetch } from 'web/src/modules/user/profile/actions';

interface UpdateProfileInput {
  currency?: string;
  timezone?: string;
  safeModeEnabled?: boolean;
  passSafetyWizard?: boolean;
  publicName?: string;
}
const updateProfile = async (params: UpdateProfileInput) => {
  const response = await fetchJson(`${p2pUrl()}/profile/`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useUpdateProfile = ({
  onDisableSafeMode,
}: {
  onDisableSafeMode?: (() => void) | undefined;
} = {}) => {
  const dispatch = useDispatch();
  const [mutate] = useMutation<UpdateProfileInput, any, unknown>(updateProfile, {
    onSuccess: () => {
      dispatch(userRefetch());
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        if (error.code === 471 && error.payload.code === 'SafetyWizardRequired') {
          onDisableSafeMode?.();
        } else {
          dispatch(
            alertPush({
              type: 'error',
              code: error.code,
              message: error.messages,
              payload: error.payload,
            }),
          );
        }
      }
    },
  });

  return mutate;
};
