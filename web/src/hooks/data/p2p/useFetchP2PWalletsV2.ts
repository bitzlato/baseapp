import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { P2PWallet } from 'web/src/modules/p2p/wallet-types';

export const useFetchP2PWalletsV2 = (currency: string | undefined) =>
  useFetch<P2PWallet[]>(
    currency ? `${p2pUrl()}/wallets/v2/?currency=${currency}` : null,
    fetchWithCreds,
  );
