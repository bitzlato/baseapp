import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { fetchJson, FetchError } from 'web/src/helpers/fetch';
import { alertPush } from 'web/src/modules/public/alert/actions';

interface TradeChatSendFile {
  tradeId: string;
  data: File;
}

const sendFile = async (params: TradeChatSendFile) => {
  const multiPartForm = new FormData();
  multiPartForm.append('file', params.data);

  const response = await fetchJson(`${p2pUrl()}/trade/${params.tradeId}/chat/sendfile`, {
    method: 'POST',
    body: multiPartForm,
    credentials: 'include',
  });

  return response;
};

export const useTradeChatSendFile = () => {
  const dispatch = useDispatch();
  return useMutation<TradeChatSendFile, any, unknown>(sendFile, {
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
