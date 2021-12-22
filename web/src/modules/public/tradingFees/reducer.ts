import { CommonState } from '../../types';
import { TradingFeesAction } from './actions';
import { TRADING_FEES_DATA, TRADING_FEES_ERROR, TRADING_FEES_FETCH } from './constants';
import { TradingFee } from './types';

export interface TradingFeesState extends CommonState {
  list: TradingFee[];
  loading: boolean;
}

const initialState: TradingFeesState = {
  list: [],
  loading: false,
};

export const tradingFeesReducer = (
  state = initialState,
  action: TradingFeesAction,
): TradingFeesState => {
  switch (action.type) {
    case TRADING_FEES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case TRADING_FEES_DATA:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case TRADING_FEES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
