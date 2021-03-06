import useMutation from 'use-mutation';
import { authUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { fetchJson } from 'web/src/helpers/fetch';

const changeAuthSubject = async (authSubject: string) => {
  const res = await fetchJson(`${authUrl()}/identity/sessions`, {
    method: 'PUT',
    body: JSON.stringify({ auth_subject: authSubject }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return res;
};

export const useChangeAuthSubject = () => {
  const handleFetchError = useHandleFetchError();
  const [mutate] = useMutation(changeAuthSubject, {
    onSuccess: () => {
      window.location.reload();
    },
    onFailure: ({ error }) => {
      handleFetchError(error);
    },
  });

  return mutate;
};
