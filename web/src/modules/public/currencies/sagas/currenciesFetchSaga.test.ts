import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootSaga, sendError } from '../../..';
import { mockNetworkError, setupMockAxios, setupMockStore } from '../../../../helpers/jest';
import { CommonError } from '../../../types';
import { currenciesData, currenciesError, currenciesFetch } from '../actions';
import { defaultCurrencySource } from '../defaults';
import { CurrencySource } from '../types';

describe('Saga: currenciesFetchSaga', () => {
  let store: MockStoreEnhanced;
  let sagaMiddleware: SagaMiddleware;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = setupMockAxios();
    sagaMiddleware = createSagaMiddleware();
    store = setupMockStore(sagaMiddleware, false)();
    sagaMiddleware.run(rootSaga);
  });

  afterEach(() => {
    mockAxios.reset();
  });

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

  const mockCurrencies = () => {
    mockAxios.onGet('/public/currencies').reply(200, fakeCurrencies);
  };

  const error: CommonError = {
    message: ['Server error'],
    code: 500,
  };

  it('should fetch currencies', async () => {
    const expectedActions = [currenciesFetch(), currenciesData(fakeCurrencies)];
    mockCurrencies();
    const promise = new Promise((resolve) => {
      store.subscribe(() => {
        const actions = store.getActions();
        if (actions.length === expectedActions.length) {
          expect(actions).toEqual(expectedActions);
          setTimeout(resolve, 0.01);
        }
        if (actions.length > expectedActions.length) {
          fail(`Unexpected action: ${JSON.stringify(actions.slice(-1)[0])}`);
        }
      });
    });
    store.dispatch(currenciesFetch());

    return promise;
  });

  it('should trigger an error on currencies fetch', async () => {
    const expectedActions = [
      currenciesFetch(),
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: currenciesError,
        },
      }),
    ];

    mockNetworkError(mockAxios);
    const promise = new Promise((resolve) => {
      store.subscribe(() => {
        const actions = store.getActions();
        if (actions.length === expectedActions.length) {
          expect(actions).toEqual(expectedActions);
          setTimeout(resolve, 0.01);
        }
      });
    });
    store.dispatch(currenciesFetch());

    return promise;
  });
});
