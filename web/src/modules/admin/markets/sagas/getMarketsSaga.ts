import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { getMarketsListData, getMarketsListError, MarketItem } from '../actions';

const requestOptions: RequestOptions = {
  apiVersion: 'peatio',
};

export function* getMarketsSaga() {
  try {
    const data: MarketItem[] = yield call(API.get(requestOptions), '/admin/markets');
    yield put(getMarketsListData({ list: data }));
  } catch (error: any) {
    yield put(getMarketsListError());
    yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
  }
}
