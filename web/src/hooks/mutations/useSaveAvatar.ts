import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { FetchError, fetchData } from 'web/src/helpers/fetch';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { userRefetch } from 'web/src/modules/user/profile/actions';

const saveAvatar = async (data: File) => {
  const multiPartForm = new FormData();
  multiPartForm.append('file', data);

  const response = await fetchData(`${p2pUrl()}/profile/avatar`, {
    method: 'POST',
    body: multiPartForm,
    credentials: 'include',
  });

  return response;
};

export const useSaveAvatar = () => {
  const dispatch = useDispatch();
  return useMutation<File, any, unknown>(saveAvatar, {
    throwOnFailure: true,
    onSuccess: () => {
      dispatch(userRefetch());
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        if (error.code === 413) {
          return;
        }

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
