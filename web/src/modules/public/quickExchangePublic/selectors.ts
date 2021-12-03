import { RootState } from '../../';
import { QuickExchangeLimits } from './types';

export const selectQuickExchangeLimits = (state: RootState): QuickExchangeLimits =>
  state.public.quickExchange.limits;

export const selectQuickExchangeLimitsFetching = (state: RootState): boolean =>
  state.public.quickExchange.fetching;
