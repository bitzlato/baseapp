import { Money } from '@bitzlato/money-js';
import { createMoneyWithoutCcy } from 'web/src/helpers/money';
import { RootState } from 'web/src/modules';
import { selectLastRecentTrade } from 'web/src/modules/public/recentTrades/selectors';
import { MarketsState } from './reducer';
import { Market } from './types';

const selectMarketsState = (state: RootState): MarketsState => state.public.markets;

export const selectMarkets = (state: RootState): Market[] => selectMarketsState(state).list;

export const selectMarketsLoading = (state: RootState): boolean | undefined =>
  selectMarketsState(state).loading;

export const selectMarketsTimestamp = (state: RootState): number | undefined =>
  selectMarketsState(state).timestamp;

export const selectMarketsTickersTimestamp = (state: RootState): number | undefined =>
  selectMarketsState(state).tickersTimestamp;

export const selectCurrentMarket = (state: RootState): Market | undefined =>
  selectMarketsState(state).currentMarket;

export const selectMarketTickers = (state: RootState): MarketsState['tickers'] =>
  selectMarketsState(state).tickers;

export const selectShouldFetchMarkets = (state: RootState): boolean =>
  !selectMarketsTimestamp(state) && !selectMarketsLoading(state);

export const selectShouldFetchMarketsTickers = (state: RootState): boolean =>
  !selectMarketsTickersTimestamp(state);

export const selectMarketPrice = (state: RootState): MarketsState['marketPrice'] =>
  selectMarketsState(state).marketPrice;

export const selectMarketPriceFetch = (state: RootState): boolean =>
  selectMarketsState(state).successMarketPriceFetch;

export type LastPrice = { price: Money; changeSign?: 'positive' | 'negative' | undefined };

export const selectLastPrice = (state: RootState): LastPrice | undefined => {
  const currentMarket = selectCurrentMarket(state);
  const marketTickers = selectMarketTickers(state);
  const lastRecentTrade = selectLastRecentTrade(state);

  if (!currentMarket) {
    return undefined;
  }

  let lastPrice = '';
  let changeSign: 'positive' | 'negative' | undefined;

  if (lastRecentTrade?.market === currentMarket.id) {
    lastPrice = lastRecentTrade.price;

    if (Number(lastRecentTrade.price_change) >= 0) {
      changeSign = 'positive';
    } else if (Number(lastRecentTrade.price_change) < 0) {
      changeSign = 'negative';
    }
  } else {
    const currentTicker = marketTickers[currentMarket.id];
    if (!currentTicker) {
      return undefined;
    }

    lastPrice = currentTicker.last;

    if (currentTicker.price_change_percent.includes('+')) {
      changeSign = 'positive';
    } else if (currentTicker.price_change_percent.includes('-')) {
      changeSign = 'negative';
    }
  }

  return {
    price: createMoneyWithoutCcy(lastPrice, currentMarket.price_precision),
    changeSign,
  };
};
