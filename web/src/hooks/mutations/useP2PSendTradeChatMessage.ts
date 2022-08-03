import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { createOptimisticChatMessage } from 'web/src/helpers/createOptimisticChatMessage';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { getP2PTradeChatEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeChat';
import { P2PChatResponse } from 'web/src/types/chat.types';

interface SendTradeChatMessageInput {
  tradeId: number;
  message: string;
}

const sendTradeChatMessage = async ({ tradeId, message }: SendTradeChatMessageInput) => {
  const response = await fetchWithCreds(`${p2pUrl()}/trade/${tradeId}/chat/`, {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response;
};

export const useP2PSendTradeChatMessage = () => {
  const { mutate, cache } = useSWRConfig();

  return useMutation(sendTradeChatMessage, {
    onMutate({ input }) {
      const tradeChatKey = getP2PTradeChatEndpoint(input.tradeId);
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
      mutate(getP2PTradeChatEndpoint(input.tradeId));
    },
    onFailure: ({ rollback }) => {
      if (rollback) {
        rollback();
      }
    },
  });
};
