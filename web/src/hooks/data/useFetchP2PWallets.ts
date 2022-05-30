import { useDispatch } from 'react-redux';
import { useSWRConfig } from 'swr';
import { p2pUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import {
  P2PCurrency,
  P2PGenerateParams,
  P2PWallet,
  P2PWalletStat,
} from 'web/src/modules/p2p/wallet-types';
import { useFetch } from './useFetch';

export function useFetchP2PWalletStat() {
  return useFetch<P2PWalletStat[]>(`${p2pUrl()}/public/wallet/stat`, fetchWithCreds);
}

export function useFetchP2PWallet(cryptoCurrency: string) {
  return useFetch<P2PWallet>(`${p2pUrl()}/wallets/${cryptoCurrency}`, fetchWithCreds);
}

export function useFetchP2PCryptoCurrencies() {
  return useFetch<P2PCurrency[]>(`${p2pUrl()}/public/refs/cryptocurrencies`, fetchWithCreds);
}

export const useGenerateP2PAddress = () => {
  const { mutate } = useSWRConfig();
  const dispatch = useDispatch();
  return async (params: P2PGenerateParams): Promise<void> => {
    try {
      await fetchWithCreds(`${p2pUrl()}/wallets/generate-address`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      mutate(`${p2pUrl()}/wallets/${params.cryptocurrency}`);
    } catch (error) {
      // тут бага в ответе сервера, в хедере application/json но возвращается сырой адрес
      if (error instanceof FetchError && error.code === 500) {
        mutate(`${p2pUrl()}/wallets/${params.cryptocurrency}`);
      } else {
        alertFetchError(dispatch, error);
      }
    }
  };
};

export function useFetchP2PWalletsV2(currency: string | undefined) {
  return useFetch<P2PWallet[]>(
    currency ? `${p2pUrl()}/wallets/v2/?${buildQueryString({ currency })}` : null,
    fetchWithCreds,
  );
}
