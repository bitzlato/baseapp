import { useMemo } from 'react';
import { Money } from '@bitzlato/money-js';
import { p2pUrl } from 'web/src/api/config';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { UserAdvert, UserAdvertDetails, UserAdvertSource } from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';
import { useFetchPaymethod } from './useFetchPaymethod';

export const useUserAds = (lang: string) => {
  const { getFiatCurrency } = useP2PFiatCurrencies();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();

  const { data, ...other } = useFetch<UserAdvertSource[]>(
    `${p2pUrl()}/dsa/all?lang=${lang}`,
    fetchWithCreds,
  );

  const ads = data?.map((ad): UserAdvert => {
    const currency = getFiatCurrency(ad.paymethod_currency);
    const cryptoCurrency = getCryptoCurrency(ad.cryptocurrency);

    return {
      ...ad,
      rate: Money.fromDecimal(ad.rateValue, currency),
      limitCurrency: {
        min: Money.fromDecimal(ad.minAmount, currency),
        max: Money.fromDecimal(ad.maxAmount, currency),
      },
      cryptoCurrency,
    };
  });

  return { data: ads, ...other };
};

export const useUserAd = ({ advertId, lang }: { advertId: string; lang: string }) => {
  const { getFiatCurrency } = useP2PFiatCurrencies();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();

  const { data, ...other } = useFetch<UserAdvertSource>(
    `${p2pUrl()}/dsa/${advertId}?lang=${lang}`,
    fetchWithCreds,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
    },
  );
  const { data: paymethod } = useFetchPaymethod(data?.paymethod, lang);
  const ad: UserAdvertDetails | undefined = useMemo(() => {
    if (!data || !paymethod) {
      return undefined;
    }

    const currency = getFiatCurrency(data.paymethod_currency);
    const cryptoCurrency = getCryptoCurrency(data.cryptocurrency);

    return {
      ...data,
      rate: Money.fromDecimal(data.rateValue, currency),
      limitCurrency: {
        min: Money.fromDecimal(data.minAmount, currency),
        max: Money.fromDecimal(data.maxAmount, currency),
      },
      cryptoCurrency,
      paymethod,
    };
  }, [data, paymethod, getCryptoCurrency, getFiatCurrency]);

  return { data: ad, ...other };
};
