import { call, put } from 'redux-saga/effects';
import { MemberLevels, sendError } from '../../..';
import { API, RequestOptions } from '../../../../api';
import { memberLevelsData, memberLevelsError } from '../actions';

const requestOptions: RequestOptions = {
  apiVersion: 'peatio',
};

export function* memberLevelsSaga() {
  try {
    const data: MemberLevels = yield call(API.get(requestOptions), '/public/member-levels');
    yield put(memberLevelsData(data));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: memberLevelsError,
        },
      }),
    );
  }
}
