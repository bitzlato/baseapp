import { call, delay, put } from 'redux-saga/effects';
import { alertPush, sendError } from '../../..';
import { API, RequestOptions } from '../../../../api';
import { getCsrfToken } from '../../../../helpers';
import {
  createQuickExchangeData,
  createQuickExchangeError,
  CreateQuickExchangeFetch,
} from '../actions';
import { QuickExchangeCreate, QuickExchangeStatus } from '../types';

const config = (csrfToken?: string): RequestOptions => {
  return {
    apiVersion: 'peatio',
    headers: { 'X-CSRF-Token': csrfToken },
  };
};

export function* createQuickExchangeOrderSaga(action: CreateQuickExchangeFetch) {
  try {
    const data: QuickExchangeCreate = yield call(
      API.post(config(getCsrfToken())),
      '/market/swap_orders',
      action.payload,
    );
    const success: boolean = yield call(waitDone, data.id);
    yield put(createQuickExchangeData({ success }));
    if (success) {
      yield put(alertPush({ message: ['quick.exchange.order.created'], type: 'success' }));
    } else {
      yield put(alertPush({ message: ['quick.exchange.order.cancelled'], type: 'error' }));
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: createQuickExchangeError,
        },
      }),
    );
  }
}

function* waitDone(id: number) {
  for (let i = 0; i < 100; i++) {
    const data: QuickExchangeStatus = yield call(API.get(config()), `/market/swap_orders/${id}`);
    if (data.state === 'wait') {
      yield delay(2000);
    } else {
      return data.state === 'done';
    }
  }
  throw new Error('The action took too long');
}
