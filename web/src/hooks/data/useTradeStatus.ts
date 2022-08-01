import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { TradeStatusSource } from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';

export const useTradeStatus = () => {
  return useFetch<TradeStatusSource>(`${p2pUrl()}/dsa/status`, fetchWithCreds);
};
