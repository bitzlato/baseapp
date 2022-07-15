import { p2pUrl } from 'web/src/api/config';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { P2PCurrencies } from 'web/src/modules/public/currencies/types';

export const useFetchP2PCurrencies = () =>
  useFetch<P2PCurrencies>(`${p2pUrl()}/public/refs/currencies`);
