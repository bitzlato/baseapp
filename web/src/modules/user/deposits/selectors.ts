import { RootState } from '../../../modules';
import { CommonError } from '../../../modules/types';
// import { Deposit } from '../history/types';
import { DepositIntention } from './types';

/* Deposits create */
export const selectDepositsCreate = (state: RootState): DepositIntention =>
  state.user.depositIntentionState.create.data;

export const selectDepositsCreateLoading = (state: RootState): boolean =>
  state.user.depositIntentionState.create.fetching;

export const selectDepositsCreateSuccess = (state: RootState): boolean =>
  state.user.depositIntentionState.create.success;

export const selectDepositsCreateError = (state: RootState): CommonError | undefined =>
  state.user.depositIntentionState.create.error;
