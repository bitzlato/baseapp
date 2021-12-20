import Bugsnag from '@bugsnag/js';
import { call, put } from 'redux-saga/effects';
import { CommonError } from 'src/modules/types';
import { alertPush } from '../../alert';
import { ErrorHandlerFetch, getErrorData } from '../actions';

export function* handleErrorSaga(action: ErrorHandlerFetch) {
  const { processingType, extraOptions, error } = action.payload;

  if (extraOptions) {
    const { params, actionError } = extraOptions;
    if (actionError) {
      if (params) {
        yield put(actionError(params));
      } else {
        yield put(actionError(error));
      }
    }
  }

  switch (processingType) {
    case 'sentry':
      yield call(handleCustomError, error);
      break;
    case 'alert':
      yield call(handleAlertError, error);
      break;
    case 'console':
      yield call(handleConsoleError, error);
      break;
    default:
      break;
  }

  yield put(getErrorData());
}

function* handleCustomError(error: CommonError) {
  for (const item of error.message) {
    yield call(Bugsnag.notify, item);
  }
}

function* handleAlertError(error: CommonError) {
  yield put(
    alertPush({
      type: 'error',
      ...error,
    }),
  );
}

function* handleConsoleError(error: CommonError) {
  yield call(window.console.error, error.message[0]);
}
