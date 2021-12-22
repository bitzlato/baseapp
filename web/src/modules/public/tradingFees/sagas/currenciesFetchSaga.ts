import { call, put, takeLeading } from 'redux-saga/effects';
import { sendError } from 'src/modules';
import { API, RequestOptions } from 'src/api';
import { tradingFeesData, tradingFeesError, TradingFeesFetch } from '../actions';
import { TRADING_FEES_FETCH } from '../constants';
import { CurrencySource } from '../types';
import { buildQueryString } from 'src/helpers';

const options: RequestOptions = {
  apiVersion: 'peatio',
};

export function* rootTradingFeesSaga() {
  yield takeLeading(TRADING_FEES_FETCH, tradingFeesFetchSaga);
}

export function* tradingFeesFetchSaga(action: TradingFeesFetch) {
  try {
    const currencies: CurrencySource[] = yield call(
      API.get(options),
      `/public/trading_fees?${buildQueryString({})}`,
    );
    yield put(tradingFeesData(currencies));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: tradingFeesError,
        },
      }),
    );
  }
}
