import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { fetchJson } from 'web/src/helpers/fetch';
import { getP2PTradeDisputeUnreadEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeDisputeChatUnread';

const markReadTradeDispute = async (tradeId: number) => {
  const response = await fetchJson(`${p2pUrl()}/trade/${tradeId}/dispute/admin-chat/unread`, {
    method: 'POST',
    credentials: 'include',
  });

  return response;
};

export const useP2PMarkReadTradeDispute = () => {
  const { mutate } = useSWRConfig();

  return useMutation(markReadTradeDispute, {
    onSuccess: ({ input }) => {
      mutate(getP2PTradeDisputeUnreadEndpoint(input));
    },
  });
};
