import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { v4 } from 'uuid';
import { p2pUrl } from 'web/src/api/config';
import { convertFileToDataURL } from 'web/src/helpers/convertFileToDataURL';
import { fetchJson } from 'web/src/helpers/fetch';
import { P2PTradeChatResponse } from 'web/src/hooks/data/p2p/useFetchP2PTradeChat';
import { getP2PTradeDisputeEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeDisputeChat';

interface SendTradeDisputeFileInput {
  tradeId: number;
  file: File;
}

const sendTradeDisputeFile = async ({ tradeId, file }: SendTradeDisputeFileInput) => {
  const form = new FormData();
  form.append('file', file);

  if (file.type) {
    form.append('mime_type', file.type);
  }

  if (file.name) {
    form.append('name', file.name);
  }

  const response = await fetchJson(`${p2pUrl()}/trade/${tradeId}/dispute/admin-chat/sendfile`, {
    method: 'POST',
    body: form,
    credentials: 'include',
  });

  return response;
};

export const useP2PSendTradeDisputeFile = () => {
  const { mutate, cache } = useSWRConfig();

  return useMutation(sendTradeDisputeFile, {
    async onMutate({ input }) {
      const tradeChatKey = getP2PTradeDisputeEndpoint(input.tradeId);
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
                message: null,
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
      mutate(getP2PTradeDisputeEndpoint(input.tradeId));
    },
    onFailure: ({ rollback }) => {
      if (rollback) {
        rollback();
      }
    },
  });
};
