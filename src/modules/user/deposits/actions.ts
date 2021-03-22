import { CommonError } from '../../../modules/types';
import { Deposit } from '../history/types';
import {
    DEPOSITS_CREATE,
    DEPOSITS_CREATE_CLEAR,
    DEPOSITS_CREATE_DATA,
    DEPOSITS_CREATE_ERROR,
} from './constants';

export interface DepositsCreate {
    type: typeof DEPOSITS_CREATE;
    payload: {
        currency: string;
        amount: string;
    };
}

export interface DepositsCreateData {
    type: typeof DEPOSITS_CREATE_DATA;
    payload: Deposit;
}

export interface DepositsCreateError {
    type: typeof DEPOSITS_CREATE_ERROR;
    error: CommonError;
}

export interface DepositsCreateClear {
    type: typeof DEPOSITS_CREATE_CLEAR;
}

export type DepositsActions =
    | DepositsCreate
    | DepositsCreateData
    | DepositsCreateClear
    | DepositsCreateError;

export const depositsCreate = (payload: DepositsCreate['payload']): DepositsCreate => ({
    type: DEPOSITS_CREATE,
    payload,
});

export const depositsCreateData = (payload: DepositsCreateData['payload']): DepositsCreateData => ({
    type: DEPOSITS_CREATE_DATA,
    payload,
});

export const depositsCreateError = (error: CommonError): DepositsCreateError => ({
    type: DEPOSITS_CREATE_ERROR,
    error,
});

export const depositsCreateClear =  (): DepositsCreateClear => ({
    type: DEPOSITS_CREATE_CLEAR
});
