import { BareFetcher, SWRConfiguration } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchJson } from 'web/src/helpers/fetch';
import { useCryptoCurrencies } from 'web/src/hooks/useCryptoCurrencies';
import { Trade, TradeAmountType, TradeSource } from 'web/src/modules/p2p/trade.types';
import { AdvertType, P2PList, PaymethodSource } from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';
import { useFiatCurrencies } from './useFetchP2PCurrencies';

export type TradesParams = {
  onlyClosed: boolean | undefined;
  type: AdvertType | undefined;
  paymethod: string | undefined;
  partner: string | undefined;
  tradeId: string | undefined;
  dateFrom: number | undefined;
  dateTo: number | undefined;
  amountType: TradeAmountType | undefined;
  amountFrom: string | undefined;
  amountTo: string | undefined;
  skip: number;
  limit: number;
};

const filterTradesParams = (params: TradesParams) => {
  const resultParams = { ...params };

  if (
    resultParams.amountType &&
    resultParams.amountTo === undefined &&
    resultParams.amountFrom === undefined
  ) {
    resultParams.amountType = undefined;
  }

  return resultParams;
};

export const useFetchP2PTrades = (
  params: TradesParams,
  lang: string,
  options?: SWRConfiguration<P2PList<Trade>, Error, BareFetcher<P2PList<Trade>>> | undefined,
) => {
  const { getFiatCurrency } = useFiatCurrencies();
  const { getCryptoCurrency } = useCryptoCurrencies();
  const filteredParams = filterTradesParams(params);

  return useFetch<P2PList<Trade>>(
    `${p2pUrl()}/trade/?${buildQueryString(filteredParams)}`,
    async (url: string) => {
      const trades = (await fetchJson(url)) as P2PList<TradeSource>;
      const paymethods = (await Promise.all(
        Array.from(new Set(trades.data.map(({ paymethod }) => paymethod))).map((id) =>
          fetchJson(`${p2pUrl()}/public/refs/paymethods/${id}?lang=${lang}`),
        ),
      )) as PaymethodSource[];
      const paymethodMap = paymethods.reduce<Record<number, PaymethodSource>>((acc, paymethod) => {
        acc[paymethod.id] = paymethod;

        return acc;
      }, {});

      return {
        ...trades,
        data: trades.data.map((trade) => {
          const paymethod = paymethodMap[trade.paymethod]!;
          const currency = getFiatCurrency(trade.currency.code);
          const cryptoCurrency = getCryptoCurrency(trade.cryptocurrency.code);

          return {
            ...trade,
            paymethod,
            currency: { ...trade.currency, moneyCurrency: currency },
            cryptoCurrency: { ...trade.cryptocurrency, moneyCurrency: cryptoCurrency },
          };
        }),
      };
    },
    options,
  );
};

export const useFetchP2PTradeInvoice = () => {
  return useMutation(async (tradeId: TradeSource['id']) => {
    const response = await fetch(`${p2pUrl()}/trade/${tradeId}/invoice?responseType=arraybuffer`, {
      credentials: 'include',
    });
    const data = await response.arrayBuffer();

    return Buffer.from(data).toString('base64');
  });
};
