import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../..';
import { API, RequestOptions } from '../../../../../api';
import { Label, labelData, labelError } from '../actions';

const userOptions: RequestOptions = {
  apiVersion: 'barong',
};

export function* labelSaga() {
  try {
    const payload: Label[] = yield call(API.get(userOptions), '/resource/labels');
    yield put(labelData(payload));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'console',
        extraOptions: {
          actionError: labelError,
        },
      }),
    );
  }
}
