import { call, put } from 'redux-saga/effects';
import { Deposit, fetchHistory, alertPush, sendError } from '../../..';
import { API, RequestOptions } from '../../../../api';
import { getCSRFToken } from '../../../../helpers';
import { DepositsCreate, depositsCreateData, depositsCreateError } from '../actions';

const config = (csrfToken?: string): RequestOptions => {
  return {
    apiVersion: 'peatio',
    headers: { 'X-CSRF-Token': csrfToken },
  };
};

const DEFAULT_LIMIT = 10;

export function* depositsCreateSaga(action: DepositsCreate) {
  try {
    const payload: Deposit = yield call(
      API.post(config(getCSRFToken())),
      '/account/deposits/intention',
      action.payload,
    );
    yield put(depositsCreateData(payload));
    // TODO fetch current page
    yield put(
      fetchHistory({
        type: 'deposits',
        limit: DEFAULT_LIMIT,
        currency: action.payload.currency,
        page: 0,
      }),
    );
    yield put(alertPush({ message: ['success.deposits.created'], type: 'success' }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: depositsCreateError,
        },
      }),
    );
  }
}
