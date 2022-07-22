import { accountUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { TotalBalances } from 'web/src/modules/account/types';

export const useFetchTotalBalance = () =>
  useFetch<TotalBalances>(`${accountUrl()}/balances/total`, fetchWithCreds);
