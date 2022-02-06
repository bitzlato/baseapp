import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { geetestCaptchaData, geetestCaptchaError, GeetestCaptchaKeys } from '../actions';

const sessionsConfig: RequestOptions = {
  apiVersion: 'barong',
};

export function* geetestCaptchaSaga() {
  try {
    const keys: GeetestCaptchaKeys = yield call(
      API.get(sessionsConfig),
      '/identity/users/register_geetest',
    );
    yield put(geetestCaptchaData(keys));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: geetestCaptchaError,
        },
      }),
    );
  }
}
