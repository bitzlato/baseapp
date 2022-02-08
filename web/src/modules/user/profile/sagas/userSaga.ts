import { call, put } from 'redux-saga/effects';
import { fetchBitzlatoId } from 'src/helpers/auth0';
import { sendError, User } from '../../..';
import { API, isFinexEnabled, RequestOptions } from '../../../../api';
import { userData, userError } from '../actions';
import { abilitiesFetch } from '../../abilities';

const userOptions: RequestOptions = {
  apiVersion: 'barong',
};

export function* userSaga() {
  try {
    yield call(fetchBitzlatoId);
    const user: User = yield call(API.get(userOptions), '/resource/users/me');
    if (isFinexEnabled()) {
      yield put(abilitiesFetch());
    }
    yield put(userData({ user }));
  } catch (error) {
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
