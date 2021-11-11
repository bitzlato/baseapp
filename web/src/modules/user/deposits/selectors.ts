import { RootState } from '../../../modules';
import { CommonError } from '../../../modules/types';
// import { Deposit } from '../history/types';
import { DepositIntention } from './types';

/* Deposits create */
export const selectDepositsCreate = (state: RootState): DepositIntention =>
  state.user.depositIntentionState.data;

export const selectDepositsCreateLoading = (state: RootState): boolean =>
  state.user.depositIntentionState.fetching;

export const selectDepositsCreateError = (state: RootState): CommonError | undefined =>
  state.user.depositIntentionState.error;
