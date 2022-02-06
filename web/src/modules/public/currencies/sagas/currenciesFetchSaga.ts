import { call, put, takeLeading } from 'redux-saga/effects';
import { sendError } from 'src/modules';
import { API, RequestOptions } from 'src/api';
import { currenciesData, currenciesError } from 'src/modules/public/currencies/actions';
import { CURRENCIES_FETCH } from 'src/modules/public/currencies/constants';
import { CurrencySource } from 'src/modules/public/currencies/types';

const currenciesOptions: RequestOptions = {
  apiVersion: 'peatio',
};

export function* rootCurrenciesSaga() {
  yield takeLeading(CURRENCIES_FETCH, currenciesFetchSaga);
}

export function* currenciesFetchSaga() {
  try {
    const currencies: CurrencySource[] = yield call(
      API.get(currenciesOptions),
      '/public/currencies',
    );
    yield put(currenciesData(currencies));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: currenciesError,
        },
      }),
    );
  }
}
