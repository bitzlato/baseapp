import { Currency as MoneyCurrency, Money } from '@bitzlato/money-js';
import { RootState } from 'src/modules';
import { CurrenciesState } from './reducer';

import { ApiCurrency } from './types';

const selectCurrenciesState = (state: RootState): CurrenciesState => state.public.currencies;

export const selectCurrencies = (state: RootState): ApiCurrency[] => {
  const { list } = selectCurrenciesState(state);

  return list.map((source) => {
    const moneyCurrency: MoneyCurrency = {
      code: source.id.toUpperCase(),
      minorUnit: source.precision,
    };

    return {
      ...source,
      deposit_fee: Money.fromDecimal(source.deposit_fee, moneyCurrency),
      min_deposit_amount: Money.fromDecimal(source.min_deposit_amount, moneyCurrency),
      withdraw_fee: Money.fromDecimal(source.withdraw_fee, moneyCurrency),
      min_withdraw_amount: Money.fromDecimal(source.min_withdraw_amount, moneyCurrency),
      ...moneyCurrency,
    };
  });
};

export const selectCurrenciesLoading = (state: RootState): boolean | undefined =>
  selectCurrenciesState(state).loading;

export const selectCurrenciesTimestamp = (state: RootState): number | undefined =>
  selectCurrenciesState(state).timestamp;

export const selectShouldFetchCurrencies = (state: RootState): boolean =>
  !selectCurrenciesTimestamp(state) && !selectCurrenciesLoading(state);
