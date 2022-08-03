import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { ChatMessage } from 'web/src/types/chat.types';

export const getP2PUserChatEndpoint = (userPublicName: string) =>
  `${p2pUrl()}/userinfo/${userPublicName}/chat/`;

export interface P2PUserChatResponse {
  data: ChatMessage[];
  total: number;
}

export const useFetchP2PUserChat = (userPublicName: string) =>
  useFetch<P2PUserChatResponse>(`${p2pUrl()}/userinfo/${userPublicName}/chat/`, fetchWithCreds);
