import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { createOptimisticChatMessage } from 'web/src/helpers/createOptimisticChatMessage';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { getP2PUserChatEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PUserChat';
import { P2PChatResponse } from 'web/src/types/chat.types';

interface SendUserChatMessageInput {
  userPublicName: string;
  message: string;
}

const sendUserChatMessage = async ({ userPublicName, message }: SendUserChatMessageInput) => {
  const response = await fetchWithCreds(`${p2pUrl()}/userinfo/${userPublicName}/chat/`, {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
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
      mutate(getP2PUserChatEndpoint(input.userPublicName));
    },
    onFailure: ({ rollback }) => {
      if (rollback) {
        rollback();
      }
    },
  });
};
