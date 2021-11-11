import { CommonError } from '../../../modules/types';
import { DepositsActions } from './actions';
import { DEPOSITS_CREATE, DEPOSITS_CREATE_DATA, DEPOSITS_CREATE_ERROR } from './constants';
import { DepositIntention } from './types';

export interface DepositIntentionState {
  data: DepositIntention;
  fetching: boolean;
  error?: CommonError;
}

export const initialDepositsState: DepositIntentionState = {
  data: {
    currency: '',
    amount: '',
  },
  fetching: false,
};

export const depositIntentionReducer = (
  state = initialDepositsState,
  action: DepositsActions,
): DepositIntentionState => {
  switch (action.type) {
    case DEPOSITS_CREATE:
      return {
        ...state,
        fetching: true,
        error: undefined,
      };
    case DEPOSITS_CREATE_DATA:
      return {
        ...state,
        data: action.payload,
        fetching: false,
        error: undefined,
      };
    case DEPOSITS_CREATE_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
