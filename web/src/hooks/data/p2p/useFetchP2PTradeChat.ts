import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { ChatMessage } from 'web/src/types/chat.types';

export const getP2PTradeChatEndpoint = (tradeId: number) => `${p2pUrl()}/trade/${tradeId}/chat/`;

// TODO: move and rename
export interface P2PTradeChatResponse {
  data: ChatMessage[];
  total: number;
}

export const useFetchP2PTradeChat = (tradeId: number) =>
  useFetch<P2PTradeChatResponse>(getP2PTradeChatEndpoint(tradeId), fetchWithCreds, {
    revalidateOnFocus: false,
  });
