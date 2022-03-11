import { Dispatch } from 'redux';
import { alertPush } from '../modules/public/alert/actions';
import { FetcherError } from './fetcher';

export function alertFetchError(dispatch: Dispatch, error: unknown) {
  if (error instanceof FetcherError) {
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
