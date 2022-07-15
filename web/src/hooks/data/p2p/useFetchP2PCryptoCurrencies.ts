import { p2pUrl } from 'web/src/api/config';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { P2PCryptoCurrencySource } from 'web/src/modules/p2p/wallet-types';

export const useFetchP2PCryptoCurrencies = () =>
  useFetch<P2PCryptoCurrencySource[]>(`${p2pUrl()}/public/refs/cryptocurrencies`);
