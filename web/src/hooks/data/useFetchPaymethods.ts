import { p2pUrl } from 'web/src/api/config';
import { useUser } from 'web/src/components/app/AppContext';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { P2PList, PaymethodInfo, PaymethodsParams } from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';

const fetchPaymethods = async (
  endpoint: string,
  params: PaymethodsParams,
): Promise<P2PList<PaymethodInfo>> => {
  return fetchWithCreds(`${endpoint}?${buildQueryString(params)}`);
};

export const useFetchPaymethods = (params: PaymethodsParams) => {
  const user = useUser();
  const endpoint = `${p2pUrl()}${user === undefined ? '/public' : ''}/exchange/paymethods/`;

  return useFetch<P2PList<PaymethodInfo>>([endpoint, params], fetchPaymethods);
};
