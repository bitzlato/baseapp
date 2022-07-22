import { belomorUrl } from 'web/src/api/config';
import { fetchJson } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { BlockchainFeesSource } from 'web/src/types/blockchains.types';

export const useFetchBlockchainFees = (
  params: { blockchainKey: string; currencyCode: string } | undefined,
) => {
  return useFetch<BlockchainFeesSource>(
    params
      ? `${belomorUrl()}/public/blockchains/${
          params.blockchainKey
        }/currencies/${params.currencyCode.toLowerCase()}/fee`
      : null,
    fetchJson,
    {
      refreshInterval: 15_000,
    },
  );
};
