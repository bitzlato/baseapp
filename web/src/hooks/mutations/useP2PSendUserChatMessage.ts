import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { v4 } from 'uuid';
import { p2pUrl } from 'web/src/api/config';
import { fetchJson } from 'web/src/helpers/fetch';
import { P2PTradeChatResponse } from 'web/src/hooks/data/p2p/useFetchP2PTradeChat';
import { getP2PUserChatEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PUserChat';

interface SendUserChatMessageInput {
  userPublicName: string;
  message: string;
}

const sendUserChatMessage = async ({ userPublicName, message }: SendUserChatMessageInput) => {
  const response = await fetchJson(`${p2pUrl()}/userinfo/${userPublicName}/chat/`, {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useP2PSendUserChatMessage = () => {
  const { mutate, cache } = useSWRConfig();

  return useMutation(sendUserChatMessage, {
    onMutate({ input }) {
      const tradeChatKey = getP2PUserChatEndpoint(input.userPublicName);
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
      mutate(getP2PUserChatEndpoint(input.userPublicName));
    },
    onFailure: ({ rollback }) => {
      if (rollback) {
        rollback();
      }
    },
  });
};
