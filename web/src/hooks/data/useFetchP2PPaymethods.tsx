import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { AdvertType, PaymethodSource } from 'web/src/modules/p2p/types';
import { Language } from 'web/src/types';
import { useFetch } from './useFetch';

interface P2PPaymethodsParams {
  type?: AdvertType | undefined;
  currency?: string | undefined;
  cryptocurrency?: string | undefined;
  lang?: Language | undefined;
}

export const useFetchP2PPaymethods = ({
  type,
  currency,
  cryptocurrency,
  lang,
}: P2PPaymethodsParams) => {
  return useFetch<Array<PaymethodSource>>(
    type === undefined || currency === undefined || cryptocurrency === undefined
      ? null
      : `${p2pUrl()}/dsa/paymethods/${type}/${currency}/${cryptocurrency}/?lang=${lang}`,
    fetchWithCreds,
  );
};
