import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { fetchJson } from 'web/src/helpers/fetch';
import { getP2PTradeChatUnreadEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeChatUnread';

const markReadTradeChat = async (tradeId: number) => {
  const response = await fetchJson(`${p2pUrl()}/trade/${tradeId}/chat/unread`, {
    method: 'POST',
    credentials: 'include',
  });

  return response;
};

export const useP2PMarkReadTradeChat = () => {
  const { mutate } = useSWRConfig();

  return useMutation(markReadTradeChat, {
    onSuccess: ({ input }) => {
      mutate(getP2PTradeChatUnreadEndpoint(input));
    },
  });
};
