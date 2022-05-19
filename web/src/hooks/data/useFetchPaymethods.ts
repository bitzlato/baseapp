import { p2pUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { P2PList, PaymethodInfo, PaymethodsParams } from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';

export const useFetchPaymethods = (params: PaymethodsParams) =>
  useFetch<P2PList<PaymethodInfo>>(
    `${p2pUrl()}/public/exchange/paymethods/?${buildQueryString(params)}`,
    fetchWithCreds,
  );
