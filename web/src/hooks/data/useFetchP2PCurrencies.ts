import useSWR from 'swr';
import { p2pUrl } from 'web/src/api/config';
import { fetcher, SWR } from './fetcher';

type P2PCurrency = {
  name: string;
  code: string;
  sign: string;
};
type P2PCurrencies = P2PCurrency[];

export const useFetchP2PCurrencies = (): SWR<P2PCurrencies> => {
  return useSWR<P2PCurrencies>(`${p2pUrl()}/public/refs/currencies`, fetcher);
};
