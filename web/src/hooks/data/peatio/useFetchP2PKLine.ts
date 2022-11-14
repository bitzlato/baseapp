import { UTCTimestamp } from 'lightweight-charts';
import { tradeUrl } from 'web/src/api/config';
import { fetchJson } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';

export const useFetchP2PKLine = (marketId: string) => {
  const to = Math.floor(Date.now() / 1000);
  const from = to - 40 * 24 * 60 * 60;

  return useFetch<ReadonlyArray<[UTCTimestamp, number, number, number, number, number]>>(
    `${tradeUrl()}/public/markets/${marketId}/p2p-k-line?period=60&time_from=${from}&time_to=${to}`,
    fetchJson,
    {
      refreshInterval: 20 * 1000,
    },
  );
};
