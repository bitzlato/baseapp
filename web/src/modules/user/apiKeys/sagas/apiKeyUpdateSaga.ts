import { call, put } from 'redux-saga/effects';
import { alertPush, sendError } from '../../..';
import { API, RequestOptions } from '../../../../api';
import { getCsrfToken } from '../../../../helpers';
import {
  ApiKeyDataInterface,
  apiKeys2FAModal,
  apiKeysError,
  apiKeyUpdate,
  ApiKeyUpdateFetch,
} from '../actions';

const updateOptions = (csrfToken?: string): RequestOptions => {
  return {
    apiVersion: 'barong',
    headers: { 'X-CSRF-Token': csrfToken },
  };
};

export function* apiKeyUpdateSaga(action: ApiKeyUpdateFetch) {
  try {
    const { totp_code } = action.payload;
    const { kid, state } = action.payload.apiKey;
    const updatedApiKey: ApiKeyDataInterface = yield call(
      API.patch(updateOptions(getCsrfToken())),
      `/resource/api_keys/${kid}`,
      { totp_code, state },
    );
    yield put(apiKeyUpdate(updatedApiKey));
    yield put(alertPush({ message: ['success.api_keys.updated'], type: 'success' }));
    yield put(apiKeys2FAModal({ action: undefined }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: apiKeysError,
        },
      }),
    );
  }
}
