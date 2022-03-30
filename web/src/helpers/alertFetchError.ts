import { Dispatch } from 'redux';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { toggleNeedVerification } from 'web/src/modules/user/profile/actions';
import { FetchError } from './fetch';

export function alertFetchError(dispatch: Dispatch, error: unknown) {
  if (error instanceof FetchError) {
    if (error.code === 403 && error.payload.message === 'Not allowed: all') {
      dispatch(toggleNeedVerification({ needVerification: true }));
    } else {
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
}
