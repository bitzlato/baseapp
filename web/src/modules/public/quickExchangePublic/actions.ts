import { QE_LIMITS_FETCH, QE_LIMITS_DATA, QE_LIMITS_ERROR } from './constants';
import { QuickExchangeLimits } from './types';

interface QuickExchangeLimitsFetch {
  type: typeof QE_LIMITS_FETCH;
}

interface QuickExchangeLimitsData {
  type: typeof QE_LIMITS_DATA;
  payload: QuickExchangeLimits;
}

interface QuickExchangeLimitsError {
  type: typeof QE_LIMITS_ERROR;
}

export type CreateQuickExchangeActions =
  | QuickExchangeLimitsFetch
  | QuickExchangeLimitsData
  | QuickExchangeLimitsError;

export const quickExchangeLimitsFetch = (): QuickExchangeLimitsFetch => ({
  type: QE_LIMITS_FETCH,
});

export const quickExchangeLimitsData = (payload: QuickExchangeLimits): QuickExchangeLimitsData => ({
  type: QE_LIMITS_DATA,
  payload,
});

export const quickExchangeLimitsError = (): QuickExchangeLimitsError => ({
  type: QE_LIMITS_ERROR,
});
