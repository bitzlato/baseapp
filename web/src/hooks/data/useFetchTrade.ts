import { p2pUrl } from 'web/src/api';
import { useUser } from 'web/src/components/app/UserContext';
import { TradeInfo } from 'web/src/components/shared/Trade/types';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from './useFetch';

export const useFetchTradeInfo = (tradeId: string | undefined) =>
  useFetch<TradeInfo>(tradeId ? `${p2pUrl()}/trade/${tradeId}` : undefined, fetchWithCreds, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

export function useFetchLastRequisites(paymethodId?: number | undefined) {
  const user = useUser();

  return useFetch<{ data: string[] }>(
    user && paymethodId ? `${p2pUrl()}/profile/last-trade-details/${paymethodId}` : null,
    fetchWithCreds,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );
}
