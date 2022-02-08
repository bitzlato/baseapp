import { CommonError } from '../../types';
import * as actions from './actions';
import { defaultCurrencySource } from './defaults';
import { currenciesReducer, CurrenciesState, initialCurrenciesState } from './reducer';
import { CurrencySource } from './types';

describe('Currencies reducer', () => {
  const fakeCurrencies: CurrencySource[] = [
    {
      ...defaultCurrencySource,
      id: 'bch',
      name: 'Bitcoin Cash',
      min_deposit_amount: '0.0000748',
    },

    {
      ...defaultCurrencySource,
      id: 'eur',
      name: 'Euro',
      min_deposit_amount: '0.0000748',
    },
  ];

  const error: CommonError = {
    code: 500,
    message: ['Server error'],
  };

  it('should handle CURRENCIES_FETCH', () => {
    const expectedState: CurrenciesState = {
      ...initialCurrenciesState,
      loading: true,
      timestamp: Math.floor(Date.now() / 1000),
    };
    expect(currenciesReducer(initialCurrenciesState, actions.currenciesFetch())).toEqual(
      expectedState,
    );
  });

  it('should handle MARKETS_DATA', () => {
    const expectedState: CurrenciesState = {
      ...initialCurrenciesState,
      loading: false,
      list: fakeCurrencies,
    };
    expect(
      currenciesReducer(initialCurrenciesState, actions.currenciesData(fakeCurrencies)),
    ).toEqual(expectedState);
  });

  it('should handle MARKETS_ERROR', () => {
    const expectedState: CurrenciesState = {
      ...initialCurrenciesState,
      loading: false,
    };
    expect(currenciesReducer(initialCurrenciesState, actions.currenciesError(error))).toEqual(
      expectedState,
    );
  });
});
