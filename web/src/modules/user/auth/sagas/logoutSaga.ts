import { call, put } from 'redux-saga/effects';
import { sendError } from '../../..';
import { API, RequestOptions } from '../../../../api';
import { signInRequire2FA } from '..';
import { resetHistory } from '../../history';
import { userOpenOrdersReset } from '../../openOrders';
import { userReset } from '../../profile';
import { logoutError } from '../actions';
import { StorageKeys } from 'web/src/helpers/storageKeys';

const requestOptions: RequestOptions = {
  apiVersion: 'barong',
};

export function* logoutSaga() {
  try {
    yield call(API.delete(requestOptions), '/identity/sessions');
    yield put(userReset());
    localStorage.removeItem(StorageKeys.csrfToken);
    yield put(userOpenOrdersReset());
    yield put(signInRequire2FA({ require2fa: false }));
    yield put(resetHistory());
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: logoutError,
        },
      }),
    );

    if ((error as any).message.indexOf('identity.session.not_found') > -1) {
      yield put(userReset());
    }
  }
}
