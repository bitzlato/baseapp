import { BareFetcher, SWRConfiguration } from 'swr';
import { p2pUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import {
  P2PChangeTransactionParams,
  P2PList,
  P2PTransaction,
  P2PTransactionsParams,
} from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';

export function useFetchP2PTransactions(
  params: P2PTransactionsParams,
  options?:
    | SWRConfiguration<P2PList<P2PTransaction>, Error, BareFetcher<P2PList<P2PTransaction>>>
    | undefined,
) {
  return useFetch<P2PList<P2PTransaction>>(
    `${p2pUrl()}/transactions/?${buildQueryString(params)}`,
    fetchWithCreds,
    options,
  );
}

export function changeTransaction(id: number, params: P2PChangeTransactionParams) {
  return fetchWithCreds(`${p2pUrl()}/transactions/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
}
