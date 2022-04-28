import { call, put } from 'redux-saga/effects';
import { StorageKeys } from 'web/src/helpers/storageKeys';
import { sendError } from '../../..';
import { API, RequestOptions } from '../../../../api';
import { User, userData } from '../../profile';
import { signUpData, signUpError, SignUpFetch } from '../actions';

const signUpConfig: RequestOptions = {
  apiVersion: 'barong',
};

const configUpdateOptions = (csrfToken?: string): RequestOptions => {
  return {
    apiVersion: 'sonic',
    headers: { 'X-CSRF-Token': csrfToken },
  };
};

export function* signUpSaga(action: SignUpFetch) {
  try {
    const data: User = yield call(API.post(signUpConfig), '/identity/users', action.payload);

    if (data.csrf_token) {
      localStorage.setItem(StorageKeys.csrfToken, data.csrf_token);

      if (action.callbackAction) {
        const { scope, key, value, component } = action.callbackAction;
        const payload = {
          key,
          value,
          scope,
        };

        yield call(
          API.put(configUpdateOptions(data.csrf_token)),
          `/admin/${component}/secret`,
          payload,
        );
      }
    }
    yield put(userData({ user: data }));
    yield put(signUpData());
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: signUpError,
        },
      }),
    );
  }
}
