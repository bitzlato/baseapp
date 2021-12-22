import { CommonError } from '../../types';
import { TRADING_FEES_DATA, TRADING_FEES_ERROR, TRADING_FEES_FETCH } from './constants';
import { CurrencySource } from './types';

export interface TradingFeesFetch {
  type: typeof TRADING_FEES_FETCH;
}

export interface TradingFeesData {
  type: typeof TRADING_FEES_DATA;
  payload: CurrencySource[];
}

export interface TradingFeesError {
  type: typeof TRADING_FEES_ERROR;
  error: CommonError;
}

export type TradingFeesAction = TradingFeesFetch | TradingFeesData | TradingFeesError;

export const tradingFeesFetch = (): TradingFeesFetch => ({
  type: TRADING_FEES_FETCH,
});

export const tradingFeesData = (payload: TradingFeesData['payload']): TradingFeesData => ({
  type: TRADING_FEES_DATA,
  payload,
});

export const tradingFeesError = (error: CommonError): TradingFeesError => ({
  type: TRADING_FEES_ERROR,
  error,
});
