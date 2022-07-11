import { belomorUrl } from 'web/src/api';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { Blockchain } from 'web/src/modules/public/blockchains/types';

export const useFetchBlockchains = () =>
  useFetch<Blockchain[]>(`${belomorUrl()}/public/blockchains`);
