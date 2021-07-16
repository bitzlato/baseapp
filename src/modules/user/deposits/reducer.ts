import { CommonError } from '../../../modules/types';
import { DepositsActions } from './actions';
import {
    DEPOSITS_CREATE,
    DEPOSITS_CREATE_CLEAR,
    DEPOSITS_CREATE_DATA,
    DEPOSITS_CREATE_ERROR,
} from './constants';
import { DepositIntention } from './types';

const defaultDeposit: DepositIntention = {
    currency: '',
    amount: '',
};

export interface DepositIntentionState {
    create: {
        data: DepositIntention;
        fetching: boolean;
        success: boolean;
        error?: CommonError;
    };
}

export const initialDepositsState: DepositIntentionState = {
    create: {
        data: defaultDeposit,
        fetching: false,
        success: false,
    }
};

const depositsCreateReducer = (state: DepositIntentionState['create'], action: DepositsActions) => {
    switch (action.type) {
        case DEPOSITS_CREATE:
            return {
                ...state,
                fetching: true,
                success: false,
                error: undefined,
            };
        case DEPOSITS_CREATE_CLEAR:
            return {
                ...state,
                fetching: false,
                success: false,
                error: undefined,
            };
        case DEPOSITS_CREATE_DATA:
            return {
                ...state,
                data: action.payload,
                fetching: false,
                success: true,
                error: undefined,
            };
        case DEPOSITS_CREATE_ERROR:
            return {
                ...state,
                fetching: false,
                success: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export const depositIntentionReducer = (state = initialDepositsState, action: DepositsActions) => {
    switch (action.type) {
        case DEPOSITS_CREATE:
        case DEPOSITS_CREATE_DATA:
        case DEPOSITS_CREATE_CLEAR:
        case DEPOSITS_CREATE_ERROR:
            const depositsCreateState = { ...state.create };

            return {
                ...state,
                create: depositsCreateReducer(depositsCreateState, action),
            };
        default:
            return state;
    }
};
