import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';

export const getP2PTradeDisputeUnreadEndpoint = (tradeId: number) =>
  `${p2pUrl()}/trade/${tradeId}/dispute/admin-chat/unread`;

export const useFetchP2PTradeDisputeUnread = (tradeId?: number | undefined) =>
  useFetch<number>(tradeId ? getP2PTradeDisputeUnreadEndpoint(tradeId) : null, fetchWithCreds, {
    revalidateOnFocus: false,
  });
