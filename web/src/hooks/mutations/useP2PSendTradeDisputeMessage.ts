import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { createOptimisticChatMessage } from 'web/src/helpers/createOptimisticChatMessage';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { getP2PTradeDisputeEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeDispute';
import { P2PChatResponse } from 'web/src/types/chat.types';

interface SendTradeDisputeMessageInput {
  tradeId: number;
  message: string;
}

const sendTradeDisputeMessage = async ({ tradeId, message }: SendTradeDisputeMessageInput) => {
  const response = await fetchWithCreds(`${p2pUrl()}/trade/${tradeId}/dispute/admin-chat/`, {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response;
};

export const useP2PSendTradeDisputeMessage = () => {
  const { mutate, cache } = useSWRConfig();

  return useMutation(sendTradeDisputeMessage, {
    onMutate({ input }) {
      const tradeChatKey = getP2PTradeDisputeEndpoint(input.tradeId);
      const oldData = cache.get(tradeChatKey);

      mutate(
        tradeChatKey,
        (current: P2PChatResponse) => {
          return {
            ...current,
            data: [...current.data, createOptimisticChatMessage(input.message)],
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
