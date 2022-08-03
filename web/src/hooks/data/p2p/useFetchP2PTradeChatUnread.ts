import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';

export const getP2PTradeChatUnreadEndpoint = (tradeId: number) =>
  `${p2pUrl()}/trade/${tradeId}/chat/unread`;

export const useFetchP2PTradeChatUnread = (tradeId: number) =>
  useFetch<number>(getP2PTradeChatUnreadEndpoint(tradeId), fetchWithCreds, {
    revalidateOnFocus: false,
  });
