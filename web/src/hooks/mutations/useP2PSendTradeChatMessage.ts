import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { v4 } from 'uuid';
import { p2pUrl } from 'web/src/api/config';
import { fetchJson } from 'web/src/helpers/fetch';
import {
  getP2PTradeChatEndpoint,
  P2PTradeChatResponse,
} from 'web/src/hooks/data/p2p/useFetchP2PTradeChat';

interface SendTradeChatMessageInput {
  tradeId: number;
  message: string;
}

const sendTradeChatMessage = async ({ tradeId, message }: SendTradeChatMessageInput) => {
  const response = await fetchJson(`${p2pUrl()}/trade/${tradeId}/chat/`, {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
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
        (current: P2PTradeChatResponse) => {
          return {
            ...current,
            data: [
              ...current.data,
              {
                id: v4(),
                created: Date.now(),
                file: null,
                message: input.message,
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
