import {
  ToggleFreezed,
  toggleFreezed,
  ToggleNeedVerification,
  toggleNeedVerification,
} from 'web/src/modules/user/profile/actions';
import { FetchError } from 'web/src/helpers/fetch';
import { ALERT_DATA, ALERT_DELETE, ALERT_DELETE_BY_INDEX, ALERT_PUSH } from './constants';

export interface Alert {
  type: string;
  code?: number | undefined;
  message: string[];
  payload?: Record<string, string> | undefined;
}

export interface AlertPush {
  type: typeof ALERT_PUSH;
  payload: Alert;
}

export interface AlertData {
  type: typeof ALERT_DATA;
  payload: Alert;
}

export interface AlertDelete {
  type: typeof ALERT_DELETE;
}

export interface AlertDeleteByIndex {
  type: typeof ALERT_DELETE_BY_INDEX;
  index: number;
}

export type AlertAction = AlertPush | AlertData | AlertDelete | AlertDeleteByIndex;

export const alertPush = (payload: AlertPush['payload']): AlertPush => ({
  type: ALERT_PUSH,
  payload,
});

export const alertData = (payload: AlertData['payload']): AlertData => ({
  type: ALERT_DATA,
  payload,
});

export const alertDelete = (): AlertDelete => ({
  type: ALERT_DELETE,
});

export const alertDeleteByIndex = (index: number): AlertDeleteByIndex => ({
  type: ALERT_DELETE_BY_INDEX,
  index,
});

export const alertFetchError = (
  error: unknown,
): AlertPush | ToggleFreezed | ToggleNeedVerification | { type: '__skip' } => {
  if (error instanceof FetchError) {
    if (
      (error.code === 403 && error.payload.code === 'OperationIsFrozen') ||
      (error.code === 403 && error.payload.message === 'Not allowed: all') ||
      (error.code === 500 && error.messages.includes('user can not make orders'))
    ) {
      return toggleFreezed({ freezed: true });
    }

    if (error.code === 494 && error.payload.code === 'NotVerified') {
      return toggleNeedVerification({ needVerification: true });
    }

    return alertPush({
      type: 'error',
      code: error.code,
      message: error.messages,
      payload: error.payload,
    });
  }

  return {
    type: '__skip',
  };
};
