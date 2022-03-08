import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { fetcher, FetcherError } from 'web/src/helpers/fetcher';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { userRefetch } from 'web/src/modules/user/profile/actions';

const saveSettings = async (params: {
  saveRequisites?: boolean;
  notifications?: {
    newReferral?: string;
    dividendsReceived?: string;
    comissionReturn?: string;
    userMessage?: string;
  };
}) => {
  const res = await fetcher(`${p2pUrl()}/settings`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return res;
};

export const useSaveSettings = () => {
  const dispatch = useDispatch();
  const [mutate] = useMutation(saveSettings, {
    onSuccess: () => {
      dispatch(userRefetch());
    },
    onFailure: ({ error }) => {
      if (error instanceof FetcherError) {
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

  return mutate;
};
