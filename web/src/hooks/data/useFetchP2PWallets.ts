import { useSWRConfig } from 'swr';
import { p2pUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
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

export function useFetchP2PWallet(cryptoCurrency?: string | undefined) {
  return useFetch<P2PWallet>(
    cryptoCurrency ? `${p2pUrl()}/wallets/${cryptoCurrency}` : null,
    fetchWithCreds,
  );
}

export function useFetchP2PCryptoCurrencies() {
  return useFetch<P2PCurrency[]>(`${p2pUrl()}/public/refs/cryptocurrencies`, fetchWithCreds);
}

export const useGenerateP2PAddress = () => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();

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
        handleFetchError(error);
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
