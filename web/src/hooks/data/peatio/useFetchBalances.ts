import { tradeUrl } from 'web/src/api/config';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { AccountBalanceSource } from 'web/src/modules/public/accounts/types';

export const useFetchBalances = () =>
  useFetch<AccountBalanceSource[]>(`${tradeUrl()}/account/balances`);
