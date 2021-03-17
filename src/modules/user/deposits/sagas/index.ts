import { takeEvery } from 'redux-saga/effects';
import {
    DEPOSITS_CREATE,
    // DEPOSITS_FETCH,
} from '../constants';
import { depositsCreateSaga } from './depositsCreateSaga';
// import { depositsSaga } from './depositsSaga';

export function* rootDepositIntentionSaga() {
    yield takeEvery(DEPOSITS_CREATE, depositsCreateSaga);
    // yield takeLatest(DEPOSITS_FETCH, depositsSaga);
}
