import { useSWRConfig } from 'swr';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { P2PGenerateParams, P2PWallet, P2PWalletStat } from 'web/src/modules/p2p/wallet-types';
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
