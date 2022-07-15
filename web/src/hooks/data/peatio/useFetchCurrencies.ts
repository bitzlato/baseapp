import { tradeUrl } from 'web/src/api';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { CurrencySource } from 'web/src/modules/public/currencies/types';

export const useFetchCurrencies = () =>
  useFetch<CurrencySource[]>(`${tradeUrl()}/public/currencies`);
