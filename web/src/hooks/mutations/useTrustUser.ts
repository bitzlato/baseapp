import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { fetchJson, FetchError } from 'web/src/helpers/fetch';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { userRefetch } from 'web/src/modules/user/profile/actions';

interface TrustUserInput {
  flag: boolean;
  publicName: string;
}

const trustUser = async (params: TrustUserInput) => {
  const response = await fetchJson(`${p2pUrl()}/userinfo/${params.publicName}/trust`, {
    method: 'POST',
    body: JSON.stringify({
      trust: params.flag,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useTrustUser = () => {
  const dispatch = useDispatch();
  const [mutate] = useMutation<TrustUserInput, any, unknown>(trustUser, {
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

  return mutate;
};
