import { p2pUrl } from 'web/src/api';
import { TradeInfo } from 'web/src/components/shared/Trade/types';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from './useFetch';

export const useFetchTradeInfo = (tradeId: string | undefined) =>
  useFetch<TradeInfo>(tradeId ? `${p2pUrl()}/trade/${tradeId}` : undefined, fetchWithCreds, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

export function useFetchTradeChat(tradeId: string | undefined) {
  return useFetch(tradeId ? `${p2pUrl()}/trade/${tradeId}/chat/` : null, fetchWithCreds, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
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

export function useFetchLastRequisites(paymethodId: number) {
  return useFetch<{ data: string[] }>(
    `${p2pUrl()}/profile/last-trade-details/${paymethodId}`,
    fetchWithCreds,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );
}
