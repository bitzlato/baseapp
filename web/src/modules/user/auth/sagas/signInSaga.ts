import { call, put } from 'redux-saga/effects';
import { setCSRFToken } from 'web/src/helpers';
import { sendError } from '../../..';
import { API, RequestOptions } from '../../../../api';
import { changeLanguage } from '../../../public/i18n';
import { User, userData } from '../../profile';
import { signInData, signInError, SignInFetch, signInRequire2FA } from '../actions';

const sessionsConfig: RequestOptions = {
  apiVersion: 'barong',
};

export function* signInSaga(action: SignInFetch) {
  try {
    const user: User = yield call(API.post(sessionsConfig), '/identity/sessions', action.payload);

    if (user.data && JSON.parse(user.data).language) {
      yield put(changeLanguage(JSON.parse(user.data).language));
    }
    yield put(userData({ user }));

    if (user.csrf_token) {
      setCSRFToken(user.csrf_token);
    }

    yield put(signInRequire2FA({ require2fa: user.otp }));

    yield put(signInData());
  } catch (error) {
    if (
      (error as any).code === 401 &&
      (error as any).message.indexOf('identity.session.missing_otp') > -1
    ) {
      yield put(signInRequire2FA({ require2fa: true }));
      yield put(signInData());
    } else {
      yield put(
        sendError({
          error,
          processingType: 'alert',
          extraOptions: {
            actionError: signInError,
          },
        }),
      );
    }
  }
}
