import { Dispatch } from 'redux';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { toggleNeedVerification } from 'web/src/modules/user/profile/actions';
import { FetchError } from './fetch';

export function alertFetchError(dispatch: Dispatch, error: unknown) {
  if (error instanceof FetchError) {
    if (
      (error.code === 403 && error.payload.code === 'OperationIsFrozen') ||
      (error.code === 403 && error.payload.message === 'Not allowed: all') ||
      (error.code === 500 && error.messages.includes('user can not make orders'))
    ) {
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
