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
      ...moneyCurrency,
      deposit_fee: createMoney(source.deposit_fee, moneyCurrency),
      min_withdraw_amount: createMoney(source.min_withdraw_amount, moneyCurrency),
      blockchain_currencies: source.blockchain_currencies.map((d) => ({
        blockchain_id: d.blockchain_id,
        blockchain_key: d.blockchain_key,
        withdraw_fee: createMoney(d.withdraw_fee, moneyCurrency),
        min_deposit_amount: createMoney(d.min_deposit_amount, moneyCurrency),
      })),
    };
  });
};

export const selectCurrenciesLoading = (state: RootState): boolean | undefined =>
  selectCurrenciesState(state).loading;

export const selectCurrenciesTimestamp = (state: RootState): number | undefined =>
  selectCurrenciesState(state).timestamp;

export const selectShouldFetchCurrencies = (state: RootState): boolean =>
  !selectCurrenciesTimestamp(state) && !selectCurrenciesLoading(state);
