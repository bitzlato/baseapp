import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { sendError } from '../../errorHandler/actions';
import { quickExchangeLimitsData } from '../actions';
import { QuickExchangeLimits } from '../types';

const requestOptions: RequestOptions = {
  apiVersion: 'peatio',
};

export function* quickExchangeLimitsSaga() {
  try {
    const data: QuickExchangeLimits = yield call(API.get(requestOptions), '/public/swap/limits');
    yield put(quickExchangeLimitsData(data));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
      }),
    );
  }
}
