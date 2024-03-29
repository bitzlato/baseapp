import { call, put } from 'redux-saga/effects';
import { alertPush, Beneficiary, sendError } from '../../..';
import { API, RequestOptions } from '../../../../api';
import { getCSRFToken } from '../../../../helpers';
import {
  BeneficiariesCreate,
  beneficiariesCreateData,
  beneficiariesCreateError,
  beneficiariesDataUpdate,
} from '../actions';

const config = (csrfToken?: string): RequestOptions => {
  return {
    apiVersion: 'peatio',
    headers: { 'X-CSRF-Token': csrfToken },
  };
};

export function* beneficiariesCreateSaga(action: BeneficiariesCreate) {
  try {
    const payload: Beneficiary = yield call(
      API.post(config(getCSRFToken())),
      '/account/beneficiaries/',
      action.payload,
    );
    yield put(beneficiariesCreateData(payload));
    yield put(beneficiariesDataUpdate(payload));
    yield put(alertPush({ message: ['success.beneficiaries.created'], type: 'success' }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: beneficiariesCreateError,
        },
      }),
    );
  }
}
