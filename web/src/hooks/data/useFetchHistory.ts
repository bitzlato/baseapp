import { tradeUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { P2PList } from 'web/src/modules/p2p/types';
import { Deposit, Withdraw } from 'web/src/modules/user/history/types';
import { useFetch } from './useFetch';

export interface HistoryParams {
  currency: string;
  page: number;
  limit: number;
}

export function useFetchHistory<T extends 'deposits' | 'withdraws'>(
  type: T,
  params: HistoryParams,
) {
  return useFetch<P2PList<T extends 'deposits' ? Deposit : Withdraw>>(
    `${tradeUrl()}/account/${type}_t?${buildQueryString(params)}`,
    fetchWithCreds,
  );
}
