import { CreateQuickExchangeActions } from './actions';
import { QE_LIMITS_FETCH, QE_LIMITS_DATA, QE_LIMITS_ERROR } from './constants';
import { QuickExchangeLimits } from './types';

export interface QuickExchangePublicState {
  limits: QuickExchangeLimits;
  fetching: boolean;
}

const initialState: QuickExchangePublicState = {
  limits: {
    daily_limit: 0,
    order_limit: 0,
    weekly_limit: 0,
  },
  fetching: false,
};

export const quickExchangePublicReducer = (
  state = initialState,
  action: CreateQuickExchangeActions,
): QuickExchangePublicState => {
  switch (action.type) {
    case QE_LIMITS_FETCH:
      return { ...state, fetching: true };

    case QE_LIMITS_DATA:
      return {
        ...state,
        limits: { ...action.payload },
        fetching: false,
      };

    case QE_LIMITS_ERROR: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};
