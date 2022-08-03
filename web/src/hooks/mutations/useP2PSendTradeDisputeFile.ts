import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { convertFileToDataURL } from 'web/src/helpers/convertFileToDataURL';
import { createOptimisticChatMessage } from 'web/src/helpers/createOptimisticChatMessage';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { getP2PTradeDisputeEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeDispute';
import { P2PChatResponse } from 'web/src/types/chat.types';

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

  const response = await fetchWithCreds(
    `${p2pUrl()}/trade/${tradeId}/dispute/admin-chat/sendfile`,
    {
      method: 'POST',
      body: form,
    },
  );

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
        (current: P2PChatResponse) => {
          return {
            ...current,
            data: [...current.data, createOptimisticChatMessage('', fileDataUrl)],
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
