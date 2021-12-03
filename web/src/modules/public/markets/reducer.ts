import { CommonState } from '../../types';
import { MarketsAction } from './actions';
import {
  MARKETS_DATA,
  MARKETS_ERROR,
  MARKETS_FETCH,
  MARKETS_SET_CURRENT_MARKET,
  MARKETS_SET_CURRENT_MARKET_IFUNSET,
  MARKETS_TICKERS_DATA,
  MARKETS_TICKERS_ERROR,
  MARKETS_TICKERS_FETCH,
  MARKET_PRICE_FETCH,
  MARKET_PRICE_DATA,
  MARKET_PRICE_ERROR,
} from './constants';
import { Market, MarketPriceResponse, Ticker } from './types';

export interface MarketsState extends CommonState {
  list: Market[];
  currentMarket: Market | undefined;
  tickers: {
    [pair: string]: Ticker;
  };
  tickerLoading: boolean;
  loading: boolean;
  timestamp?: number;
  tickersTimestamp?: number;
  successMarketPriceFetch: boolean;
  marketPrice: MarketPriceResponse;
}

export const initialMarketsState: MarketsState = {
  list: [],
  currentMarket: undefined,
  tickers: {},
  tickerLoading: false,
  loading: false,
  successMarketPriceFetch: false,
  marketPrice: {
    from_currency: '',
    from_volume: '',
    inverse_price: '',
    request_currency: '',
    request_price: '',
    request_volume: '',
    to_currency: '',
    to_volume: '',
  },
};

export const marketsReducer = (
  state = initialMarketsState,
  action: MarketsAction,
): MarketsState => {
  switch (action.type) {
    case MARKETS_FETCH:
      return {
        ...state,
        loading: true,
        timestamp: Math.floor(Date.now() / 1000),
      };
    case MARKETS_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case MARKETS_ERROR:
      return {
        ...state,
        loading: false,
      };

    case MARKETS_SET_CURRENT_MARKET:
      return {
        ...state,
        currentMarket: action.payload,
      };

    case MARKETS_SET_CURRENT_MARKET_IFUNSET:
      if (state.currentMarket) {
        return state;
      }

      return {
        ...state,
        currentMarket: action.payload,
      };

    case MARKETS_TICKERS_FETCH:
      return {
        ...state,
        tickerLoading: true,
        tickersTimestamp: Math.floor(Date.now() / 1000),
      };
    case MARKETS_TICKERS_DATA:
      return {
        ...state,
        tickerLoading: false,
        tickers: action.payload,
      };
    case MARKETS_TICKERS_ERROR:
      return {
        ...state,
        tickerLoading: false,
      };
    case MARKET_PRICE_FETCH:
      return {
        ...state,
        successMarketPriceFetch: true,
        marketPrice: {
          ...state.marketPrice,
        },
      };
    case MARKET_PRICE_DATA:
      return {
        ...state,
        successMarketPriceFetch: false,
        marketPrice: {
          ...state.marketPrice,
          ...action.payload,
        },
      };
    case MARKET_PRICE_ERROR:
      return {
        ...state,
        successMarketPriceFetch: false,
        marketPrice: initialMarketsState.marketPrice,
      };
    default:
      return state;
  }
};
