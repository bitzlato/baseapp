import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { fetchJson } from 'web/src/helpers/fetch';
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
  const res = await fetchJson(`${p2pUrl()}/settings`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return res;
};

export const useSaveSettings = () => {
  const dispatch = useDispatch();
  const handleFetchError = useHandleFetchError();
  const [mutate] = useMutation(saveSettings, {
    onSuccess: () => {
      dispatch(userRefetch());
    },
    onFailure: ({ error }) => {
      handleFetchError(error);
    },
  });

  return mutate;
};
