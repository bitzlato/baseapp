import { p2pUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import {
  AdvertSource,
  AdvertParams,
  Advert,
  AdvertSingleSource,
  P2PList,
} from 'web/src/modules/p2p/types';
import { Money } from '@bitzlato/money-js';
import { useIsUserActivated } from 'web/src/components/app/UserContext';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { useFetch } from './useFetch';
import { useP2PFiatCurrencies } from '../useP2PFiatCurrencies';

export const useFetchAds = (params: AdvertParams) => {
  const isUserActivated = useIsUserActivated();
  return useFetch<P2PList<AdvertSource>>(
    `${p2pUrl()}${!isUserActivated ? '/public' : ''}/exchange/dsa/?${buildQueryString(params)}`,
    fetchWithCreds,
  );
};

export const useAds = (params: AdvertParams) => {
  const { getFiatCurrency } = useP2PFiatCurrencies();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();
  const { data, ...swr } = useFetchAds(params);

  return {
    data: data
      ? {
          ...data,
          data: data.data.map((ad): Advert => {
            const currency = getFiatCurrency(ad.currency);
            const cryptoCurrency = getCryptoCurrency(ad.cryptocurrency);

            return {
              ...ad,
              rate: Money.fromDecimal(ad.rate, currency),
              limitCurrency: {
                min: Money.fromDecimal(ad.limitCurrency.min, currency),
                max: Money.fromDecimal(ad.limitCurrency.max, currency),
                realMax: ad.limitCurrency.realMax
                  ? Money.fromDecimal(ad.limitCurrency.realMax, currency)
                  : undefined,
              },
              limitCryptoCurrency: {
                min: Money.fromDecimal(ad.limitCryptocurrency.min, cryptoCurrency),
                max: Money.fromDecimal(ad.limitCryptocurrency.max, cryptoCurrency),
                realMax: ad.limitCryptocurrency.realMax
                  ? Money.fromDecimal(ad.limitCryptocurrency.realMax, cryptoCurrency)
                  : undefined,
              },
              currency,
              cryptoCurrency,
            };
          }),
        }
      : undefined,
    ...swr,
  };
};

export const useFetchAdvert = (id: string) => {
  const isUserActivated = useIsUserActivated();
  return useFetch<AdvertSingleSource>(
    `${p2pUrl()}${!isUserActivated ? '/public' : ''}/exchange/dsa/${id}`,
    fetchWithCreds,
  );
};
