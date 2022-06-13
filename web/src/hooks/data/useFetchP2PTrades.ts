import { p2pUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useCryptoCurrencies } from 'web/src/hooks/useCryptoCurrencies';
import { P2PList, Trade, TradeSource } from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';
import { useFiatCurrencies } from './useFetchP2PCurrencies';

export type TradesParams = {
  onlyClosed: boolean | undefined;
  skip: number;
  limit: number;
};

export const useFetchP2PTrades = (params: TradesParams) =>
  useFetch<P2PList<TradeSource>>(`${p2pUrl()}/trade/?${buildQueryString(params)}`, fetchWithCreds);

export const useP2PTrades = (params: TradesParams) => {
  const { getFiatCurrency } = useFiatCurrencies();
  const { getCryptoCurrency } = useCryptoCurrencies();
  const { data, ...swr } = useFetchP2PTrades(params);

  return {
    data: data
      ? {
          ...data,
          data: data.data.map((trade): Trade => {
            const currency = getFiatCurrency(trade.currency.code);
            const cryptoCurrency = getCryptoCurrency(trade.cryptocurrency.code);

            return {
              ...trade,
              currency: { ...trade.currency, moneyCurrency: currency },
              cryptoCurrency: { ...trade.cryptocurrency, moneyCurrency: cryptoCurrency },
            };
          }),
        }
      : undefined,
    ...swr,
  };
};
