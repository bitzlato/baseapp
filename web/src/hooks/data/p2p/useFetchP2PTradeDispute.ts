import { p2pUrl } from 'web/src/api';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { P2PChatResponse } from 'web/src/types/chat.types';

export const getP2PTradeDisputeEndpoint = (tradeId: number) =>
  `${p2pUrl()}/trade/${tradeId}/dispute/admin-chat/`;

export const useFetchP2PTradeDispute = (tradeId?: number | undefined) =>
  useFetch<P2PChatResponse>(
    tradeId ? getP2PTradeDisputeEndpoint(tradeId) : undefined,
    fetchWithCreds,
    {
      revalidateOnFocus: false,
    },
  );
