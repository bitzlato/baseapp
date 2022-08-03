import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { P2PChatResponse } from 'web/src/types/chat.types';

export const getP2PUserChatEndpoint = (userPublicName: string) =>
  `${p2pUrl()}/userinfo/${userPublicName}/chat/`;

export const useFetchP2PUserChat = (userPublicName: string) =>
  useFetch<P2PChatResponse>(`${p2pUrl()}/userinfo/${userPublicName}/chat/`, fetchWithCreds);
