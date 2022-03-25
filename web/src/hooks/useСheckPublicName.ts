import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { fetchJson, FetchError } from 'web/src/helpers/fetch';
import { alertPush } from 'web/src/modules/public/alert/actions';

interface CheckPublicNameInput {
  publicName?: string;
}

const сheckPublicName = async (params: CheckPublicNameInput) => {
  const response = await fetchJson(`${p2pUrl()}/profile/check-public-name`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useCheckPublicName = () => {
  const dispatch = useDispatch();
  return useMutation<CheckPublicNameInput, any, unknown>(сheckPublicName, {
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
