import { call, put } from 'redux-saga/effects';
import { buildQueryString } from 'src/helpers/buildQueryString';
import { MarketPriceInterface, sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { marketPriceData, marketPriceError, MarketPriceFetch } from '../actions';

const marketPriceRequestOptions: RequestOptions = {
  apiVersion: 'peatio',
};

export function* marketPriceSaga(action: MarketPriceFetch) {
  try {
    const price: MarketPriceInterface = yield call(
      API.get(marketPriceRequestOptions),
      `/public/swap/price?${buildQueryString(action.payload)}`,
    );
    yield put(marketPriceData(price));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: marketPriceError,
        },
      }),
    );
  }
}
