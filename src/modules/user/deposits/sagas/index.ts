import { takeEvery } from 'redux-saga/effects';
import {
    DEPOSITS_CREATE,
} from '../constants';
import { depositsCreateSaga } from './depositsCreateSaga';

export function* rootDepositIntentionSaga() {
    yield takeEvery(DEPOSITS_CREATE, depositsCreateSaga);
}
