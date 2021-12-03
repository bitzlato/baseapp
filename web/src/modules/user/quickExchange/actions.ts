import { CommonError } from '../../types';
import {
  CREATE_QUICK_ORDER_FETCH,
  CREATE_QUICK_ORDER_DATA,
  CREATE_QUICK_ORDER_ERROR,
} from './constants';

export interface CreateQuickExchangePayload {
  from_currency: string;
  to_currency: string;
  request_currency: string;
  request_volume: string;
  price: string;
}

export interface CreateQuickExchangeFetch {
  type: typeof CREATE_QUICK_ORDER_FETCH;
  payload: CreateQuickExchangePayload;
}

export interface CreateQuickExchangeData {
  type: typeof CREATE_QUICK_ORDER_DATA;
  payload: {
    success: boolean;
  };
}

export interface CreateQuickExchangeError {
  type: typeof CREATE_QUICK_ORDER_ERROR;
  error: CommonError;
}

export type CreateQuickExchangeActions =
  | CreateQuickExchangeFetch
  | CreateQuickExchangeData
  | CreateQuickExchangeError;

export const createQuickExchangeFetch = (
  payload: CreateQuickExchangeFetch['payload'],
): CreateQuickExchangeFetch => ({
  type: CREATE_QUICK_ORDER_FETCH,
  payload,
});

export const createQuickExchangeData = (
  payload: CreateQuickExchangeData['payload'],
): CreateQuickExchangeData => ({
  type: CREATE_QUICK_ORDER_DATA,
  payload,
});

export const createQuickExchangeError = (error: CommonError): CreateQuickExchangeError => ({
  type: CREATE_QUICK_ORDER_ERROR,
  error,
});
