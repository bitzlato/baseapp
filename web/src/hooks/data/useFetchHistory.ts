import { tradeUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { P2PList } from 'web/src/modules/p2p/types';
import { Deposit, Withdraw } from 'web/src/modules/user/history/types';
import { useFetch } from './useFetch';

type HistoryTypes = 'withdraws' | 'deposits';

export interface HistoryParams {
  currency: string;
  page: number;
  limit: number;
}

export const getHistoryEndpoint = ({
  type,
  params,
}: {
  type: HistoryTypes;
  params: HistoryParams;
}) => `${tradeUrl()}/account/${type}_t?${buildQueryString(params)}`;

export function useFetchHistory<T extends HistoryTypes>(type: T, params: HistoryParams) {
  return useFetch<P2PList<T extends 'deposits' ? Deposit : Withdraw>>(
    getHistoryEndpoint({ type, params }),
    fetchWithCreds,
  );
}
