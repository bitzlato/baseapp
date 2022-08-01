import { p2pUrl } from 'web/src/api/config';
import { useFetch } from './useFetch';

type TradesAlert = {
  type: string;
  domain: string;
  code: string;
  data?:
    | object
    | {
        minBalance: {
          amount: number;
          cryptocurrency: string;
          currency: string;
        };
      };
};

export const useFetchP2PTradesAlerts = (cryptocurrency: string) => {
  return useFetch<TradesAlert[]>(`${p2pUrl()}/alerts/trades/${cryptocurrency}`);
};
