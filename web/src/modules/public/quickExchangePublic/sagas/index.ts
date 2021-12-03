import { takeLatest } from 'redux-saga/effects';
import { QE_LIMITS_FETCH } from '../constants';
import { quickExchangeLimitsSaga } from './quickExchangeLimitsSaga';

export function* rootQuickExchangeLimitsSaga() {
  yield takeLatest(QE_LIMITS_FETCH, quickExchangeLimitsSaga);
}
