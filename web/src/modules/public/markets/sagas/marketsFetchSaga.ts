import { call, put } from 'redux-saga/effects';
import { Market, sendError } from '../../..';
import { API, RequestOptions } from '../../../../api';
import { getOrderAPI } from '../../../../helpers';
import { marketsData, marketsError, MarketsFetch, setCurrentMarketIfUnset } from '../actions';

const marketsRequestOptions: RequestOptions = {
  apiVersion: getOrderAPI(),
};

const tickersOptions: RequestOptions = {
  apiVersion: 'peatio',
};

export function* marketsFetchSaga(action: MarketsFetch) {
  try {
    const { payload } = action;
    const request =
      payload && payload.type ? `/public/markets?type=${payload.type}` : '/public/markets';

    const markets: Market[] = yield call(
      API.get(payload ? tickersOptions : marketsRequestOptions),
      request,
    );
    yield put(marketsData(markets));
    yield put(setCurrentMarketIfUnset(markets[0]!));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: marketsError,
        },
      }),
    );
  }
}
