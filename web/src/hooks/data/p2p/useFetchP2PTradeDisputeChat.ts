import { p2pUrl } from 'web/src/api';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { P2PTradeChatResponse } from 'web/src/hooks/data/p2p/useFetchP2PTradeChat';
import { useFetch } from 'web/src/hooks/data/useFetch';

export const getP2PTradeDisputeEndpoint = (tradeId: number) =>
  `${p2pUrl()}/trade/${tradeId}/dispute/admin-chat/`;

export const useFetchP2PTradeDisputeChat = (tradeId?: number | undefined) =>
  useFetch<P2PTradeChatResponse>(
    tradeId ? getP2PTradeDisputeEndpoint(tradeId) : undefined,
    fetchWithCreds,
    {
      revalidateOnFocus: false,
    },
  );
