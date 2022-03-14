import { Dispatch } from 'redux';
import { alertPush } from '../modules/public/alert/actions';
import { FetchError } from './fetch';

export function alertFetchError(dispatch: Dispatch, error: unknown) {
  if (error instanceof FetchError) {
    dispatch(
      alertPush({
        type: 'error',
        code: error.code,
        message: error.messages,
        payload: error.payload,
      }),
    );
  }
}
