import { p2pUrl } from 'web/src/api';
import { TradeInfo } from 'web/src/components/shared/Trade/types';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from './useFetch';
import { ChatMessageList } from './useUserChat';

export const useFetchTradeInfo = (tradeId: string | undefined) =>
  useFetch<TradeInfo>(tradeId ? `${p2pUrl()}/trade/${tradeId}` : undefined, fetchWithCreds, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

export function useFetchTradeChat(tradeId: string | undefined) {
  return useFetch<ChatMessageList>(
    tradeId ? `${p2pUrl()}/trade/${tradeId}/chat/` : null,
    fetchWithCreds,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );
}

export function useFetchTradeDisputeChat(tradeId: string | undefined) {
  return useFetch(
    tradeId ? `${p2pUrl()}/trade/${tradeId}/dispute/admin-chat/` : null,
    fetchWithCreds,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );
}

export function useFetchLastRequisites(paymethodId?: number | undefined) {
  return useFetch<{ data: string[] }>(
    paymethodId ? `${p2pUrl()}/profile/last-trade-details/${paymethodId}` : null,
    fetchWithCreds,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );
}
