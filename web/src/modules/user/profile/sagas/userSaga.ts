import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { API, isFinexEnabled, RequestOptions } from '../../../../api';
import { userData, userError, UserFetch } from '../actions';
import { abilitiesFetch } from '../../abilities';

const userOptions: RequestOptions = {
  apiVersion: 'barong',
};

export function* userSaga(action: UserFetch) {
  try {
    const user = yield call(API.get(userOptions), '/resource/users/me');
    if (isFinexEnabled()) {
      yield put(abilitiesFetch());
    }
    yield put(userData({ user }));
  } catch (error) {
    if (error.code !== 401) {
      yield put(
        sendError({
          error,
          processingType: 'alert',
          extraOptions: {
            actionError: userError,
          },
        }),
      );
    }
  }
}
