import { createCcy, createMoney } from 'src/helpers/money';
import { RootState } from 'src/modules';
import { CurrenciesState } from './reducer';

import { ApiCurrency } from './types';

const selectCurrenciesState = (state: RootState): CurrenciesState => state.public.currencies;

export const selectCurrencies = (state: RootState): ApiCurrency[] => {
  const { list } = selectCurrenciesState(state);

  return list.map((source) => {
    const moneyCurrency = createCcy(source.id.toUpperCase(), source.precision);

    return {
      ...source,
      deposit_fee: createMoney(source.deposit_fee, moneyCurrency),
      min_deposit_amount: createMoney(source.min_deposit_amount, moneyCurrency),
      withdraw_fee: createMoney(source.withdraw_fee, moneyCurrency),
      min_withdraw_amount: createMoney(source.min_withdraw_amount, moneyCurrency),
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
