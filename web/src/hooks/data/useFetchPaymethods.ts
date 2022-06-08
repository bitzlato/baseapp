import { p2pUrl } from 'web/src/api/config';
import { useUser } from 'web/src/components/app/AppContext';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import {
  P2PList,
  PaymethodInfo,
  PaymethodInfoSource,
  PaymethodsParams,
} from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';

const toSlug = (name: string) => name.toLowerCase().replace(/[\s.]+/g, '-');

const fetchPaymethods = async (
  endpoint: string,
  params: PaymethodsParams,
): Promise<P2PList<PaymethodInfo>> => {
  const responseByParams: P2PList<PaymethodInfoSource> = await fetchWithCreds(
    `${endpoint}?${buildQueryString(params)}`,
  );

  const { lang: langFromParams } = params;
  const isNeedInEnglish = langFromParams && langFromParams !== 'en';
  if (!isNeedInEnglish) {
    return {
      ...responseByParams,
      data: responseByParams.data.map(
        (paymethodInfo): PaymethodInfo => ({
          ...paymethodInfo,
          slug: toSlug(paymethodInfo.description),
        }),
      ),
    };
  }

  const responseInEnglish: P2PList<PaymethodInfoSource> = await fetchWithCreds(
    `${endpoint}?${buildQueryString({
      ...params,
      lang: 'en',
    })}`,
  );
  return {
    ...responseByParams,
    data: responseByParams.data.map((paymethodInfo): PaymethodInfo => {
      const description = responseInEnglish.data.find(
        (item) => item.id === paymethodInfo.id,
      )?.description;
      const slug = description ? toSlug(description) : paymethodInfo.id.toString();

      return {
        ...paymethodInfo,
        slug,
      };
    }),
  };
};

export const useFetchPaymethods = (params: PaymethodsParams) => {
  const user = useUser();
  const endpoint = `${p2pUrl()}${user === undefined ? '/public' : ''}/exchange/paymethods/`;

  return useFetch<P2PList<PaymethodInfo>>([endpoint, params], fetchPaymethods);
};
