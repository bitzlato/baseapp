import { useMemo } from 'react';
import { Money } from '@bitzlato/money-js';
import { p2pUrl } from 'web/src/api/config';
import { BaseCurrency } from 'web/src/types/currencies.types';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { fetchJson, fetchWithCreds } from 'web/src/helpers/fetch';
import {
  AdvertType,
  PaymethodSource,
  UserAdvert,
  UserAdvertDetails,
  UserAdvertSource,
} from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';
import { useFetchPaymethod } from './useFetchPaymethod';

interface TraderAdvertSource {
  id: number;
  type: AdvertType;
  cryptocurrency: string;
  paymethod: number;
  rate: string;
  limitCurrency: {
    min: string;
    max: string;
    realMax: string | null;
  };
  limitCryptocurrency: {
    min: string;
    max: string;
    realMax: string | null;
  };
  terms: string;
  details: string | null;
  status: 'active' | 'pause' | 'paused_automatically';
  deepLinkCode: string;
  owner: string;
  available: boolean;
  position: null;
  unactiveReason: string | null;
}

export interface TraderAdvert
  extends Omit<
    TraderAdvertSource,
    'limitCurrency' | 'limitCryptocurrency' | 'paymethod' | 'cryptoCurrency' | 'rate'
  > {
  paymethod: PaymethodSource;
  rate: Money;
  limitCurrency: {
    min: Money;
    max: Money;
    realMax: Money | null;
  };
  limitCryptoCurrency: {
    min: Money;
    max: Money;
    realMax: Money | null;
  };
  currency: BaseCurrency;
  cryptoCurrency: BaseCurrency;
}

export const useUserAds = ({ publicName, lang }: { publicName: string; lang: string }) => {
  const { getFiatCurrency } = useP2PFiatCurrencies();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();

  return useFetch(
    `${p2pUrl()}/public/exchange/dsa/all/${publicName}/`,

    async (url: string): Promise<TraderAdvert[]> => {
      const ads = (await fetchJson(url)) as TraderAdvertSource[];
      const paymethods = (await Promise.all(
        Array.from(new Set(ads.map(({ paymethod }) => paymethod))).map((id) =>
          fetchJson(`${p2pUrl()}/public/refs/paymethods/${id}?lang=${lang}`),
        ),
      )) as PaymethodSource[];
      const paymethodMap = paymethods.reduce<Record<number, PaymethodSource>>((acc, paymethod) => {
        acc[paymethod.id] = paymethod;

        return acc;
      }, {});

      return ads.map((ad): TraderAdvert => {
        const paymethod = paymethodMap[ad.paymethod]!;
        const currency = getFiatCurrency(paymethod.currency);
        const cryptoCurrency = getCryptoCurrency(ad.cryptocurrency);

        return {
          ...ad,
          paymethod,
          rate: Money.fromDecimal(ad.rate, currency),
          limitCurrency: {
            min: Money.fromDecimal(ad.limitCurrency.min, currency),
            max: Money.fromDecimal(ad.limitCurrency.max, currency),
            realMax: ad.limitCurrency.realMax
              ? Money.fromDecimal(ad.limitCurrency.realMax, currency)
              : null,
          },
          limitCryptoCurrency: {
            min: Money.fromDecimal(ad.limitCryptocurrency.min, cryptoCurrency),
            max: Money.fromDecimal(ad.limitCryptocurrency.max, cryptoCurrency),
            realMax: ad.limitCryptocurrency.realMax
              ? Money.fromDecimal(ad.limitCryptocurrency.realMax, cryptoCurrency)
              : null,
          },
          currency,
          cryptoCurrency,
        };
      });
    },
  );
};

export const useCurrenUserAds = (lang: string) => {
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

export const useCurrenUserAd = ({ advertId, lang }: { advertId: string; lang: string }) => {
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
