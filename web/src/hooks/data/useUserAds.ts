import { Money } from '@bitzlato/money-js';
import { p2pUrl } from 'web/src/api/config';
import { fetchJson } from 'web/src/helpers/fetch';
import { PaymethodSource } from 'web/src/modules/p2p/types';
import { MoneyCurrency } from 'web/src/types';
import { useCryptoCurrencies } from '../useCryptoCurrencies';
import { useFetch } from './useFetch';
import { useFiatCurrencies } from './useFetchP2PCurrencies';

interface TraderAdvertSource {
  id: number;
  type: 'purchase' | 'selling';
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
  currency: MoneyCurrency;
  cryptoCurrency: MoneyCurrency;
}

export const useUserAds = ({ publicName, lang }: { publicName: string; lang: string }) => {
  const { getFiatCurrency } = useFiatCurrencies();
  const { getCryptoCurrency } = useCryptoCurrencies();

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
