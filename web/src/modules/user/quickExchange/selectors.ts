import { RootState } from '../..';

export const selectQuickExchangeSuccess = (state: RootState): boolean =>
  state.user.quickExchange.success;

export const selectQuickExchangeFetching = (state: RootState): boolean =>
  state.user.quickExchange.fetching;
