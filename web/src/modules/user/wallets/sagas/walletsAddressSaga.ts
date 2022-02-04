import { call, put } from 'redux-saga/effects';
import { DepositAddress, sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { walletsAddressData, walletsAddressError, WalletsAddressFetch } from '../actions';

const walletsAddressOptions: RequestOptions = {
  apiVersion: 'peatio',
};

export function* walletsAddressSaga(action: WalletsAddressFetch) {
  try {
    const url = `/account/deposit_address/${action.payload.blockchainId}`;
    const data: DepositAddress = yield call(API.get(walletsAddressOptions), url);
    yield put(walletsAddressData(data));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: walletsAddressError,
        },
      }),
    );
  }
}
