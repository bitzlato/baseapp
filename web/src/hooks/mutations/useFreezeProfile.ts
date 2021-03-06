import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { fetchJson, FetchError } from 'web/src/helpers/fetch';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { userRefetch } from 'web/src/modules/user/profile/actions';

const freezeAccount = async () => {
  const response = await fetchJson(`${p2pUrl()}/profile/self-freeze/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useFreezeProfile = () => {
  const dispatch = useDispatch();
  const [mutate, data] = useMutation(freezeAccount, {
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

  return {
    freezeAccount: () => mutate(undefined),
    ...data,
  };
};
