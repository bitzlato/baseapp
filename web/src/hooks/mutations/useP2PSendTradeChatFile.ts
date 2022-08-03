import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { v4 } from 'uuid';
import { p2pUrl } from 'web/src/api/config';
import { convertFileToDataURL } from 'web/src/helpers/convertFileToDataURL';
import { fetchJson } from 'web/src/helpers/fetch';
import {
  getP2PTradeChatEndpoint,
  P2PTradeChatResponse,
} from 'web/src/hooks/data/p2p/useFetchP2PTradeChat';

interface SendTradeChatFileInput {
  tradeId: number;
  file: File;
}

const sendTradeChatFile = async ({ tradeId, file }: SendTradeChatFileInput) => {
  const form = new FormData();
  form.append('file', file);

  if (file.type) {
    form.append('mime_type', file.type);
  }

  if (file.name) {
    form.append('name', file.name);
  }

  const response = await fetchJson(`${p2pUrl()}/trade/${tradeId}/chat/sendfile`, {
    method: 'POST',
    body: form,
    credentials: 'include',
  });

  return response;
};

export const useP2PSendTradeChatFile = () => {
  const { mutate, cache } = useSWRConfig();

  return useMutation(sendTradeChatFile, {
    async onMutate({ input }) {
      const tradeChatKey = getP2PTradeChatEndpoint(input.tradeId);
      const oldData = cache.get(tradeChatKey);
      const fileDataUrl = await convertFileToDataURL(input.file);

      mutate(
        tradeChatKey,
        (current: P2PTradeChatResponse) => {
          return {
            ...current,
            data: [
              ...current.data,
              {
                id: v4(),
                created: Date.now(),
                file: {
                  title: '',
                  url: fileDataUrl,
                },
                message: '',
                type: 'Out',
              },
            ],
          };
        },
        false,
      );

      return () => mutate(tradeChatKey, oldData, false);
    },
    onSuccess: ({ input }) => {
      mutate(getP2PTradeChatEndpoint(input.tradeId));
    },
    onFailure: ({ rollback }) => {
      if (rollback) {
        rollback();
      }
    },
  });
};
