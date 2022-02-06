import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { DocTradeUserApiDataInterface, sendError } from '../../../index';
import { docTradeUserApiData, docTradeUserApiError } from '../actions';

const docTradeUserApiFetchOptions: RequestOptions = {
  apiVersion: 'peatio',
  withHeaders: false,
};

export function* docTradeUserApiFetchSaga() {
  try {
    const payload: DocTradeUserApiDataInterface = yield call(
      API.get(docTradeUserApiFetchOptions),
      '/swagger',
    );
    yield put(docTradeUserApiData(payload));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: docTradeUserApiError,
        },
      }),
    );
  }
}
