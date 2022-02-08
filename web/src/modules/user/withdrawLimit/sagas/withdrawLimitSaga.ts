import { call, put } from 'redux-saga/effects';
import { alertPush, sendError, WithdrawLimit } from '../../..';
import { API, RequestOptions } from '../../../../api';
import { withdrawLimitData, withdrawLimitError } from '../actions';

const withdrawOption: RequestOptions = {
  apiVersion: 'applogic',
};

export function* withdrawLimitSaga() {
  try {
    const withdrawLimit: WithdrawLimit = yield call(API.get(withdrawOption), '/private/withdraws');
    yield put(withdrawLimitData(withdrawLimit));
    yield put(alertPush({ message: ['success.withdraw.action'], type: 'success' }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: withdrawLimitError,
        },
      }),
    );
  }
}
