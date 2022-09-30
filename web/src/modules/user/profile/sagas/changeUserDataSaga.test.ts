import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootSaga, sendError, User } from '../../..';
import { mockNetworkError, setupMockAxios, setupMockStore } from '../../../../helpers/jest';
import { CommonError } from '../../../types';
import { changeUserDataError, changeUserDataFetch } from '../actions';
import { DEFAULT_TEST_BITZLATO_USER } from '../defaults';

describe('Module: Change user info', () => {
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

  const error: CommonError = {
    code: 500,
    message: ['Server error'],
  };

  const fakeUser: User = {
    username: 'johnny1337',
    email: 'admin@barong.io',
    uid: 'ID26C901376F',
    role: 'admin',
    level: 3,
    otp: false,
    state: 'active',
    profiles: [],
    data: '',
    referal_uid: '',
    totp_label: '',
    labels: [],
    phone: [],
    created_at: '',
    updated_at: '',
    bitzlato_user: DEFAULT_TEST_BITZLATO_USER,
    default_auth_subject: null,
    available_auth_subjects: [],
    kyc_verification_url: '',
    account_statements_url: '',
    email_verified: true,
  };

  const mockchangeUserData = () => {
    mockAxios.onPut('/resource/users/me').reply(200);
  };

  const expectedActionsFetch = [changeUserDataFetch({ user: fakeUser })];
  const expectedActionsError = [
    changeUserDataFetch({ user: fakeUser }),
    sendError({
      error,
      processingType: 'alert',
      extraOptions: {
        actionError: changeUserDataError,
      },
    }),
  ];

  it('should change user data info in success flow', async () => {
    mockchangeUserData();
    const promise = new Promise((resolve) => {
      store.subscribe(() => {
        const actions = store.getActions();
        if (actions.length === expectedActionsFetch.length) {
          expect(actions).toEqual(expectedActionsFetch);
          resolve(undefined);
        }
      });
    });

    store.dispatch(changeUserDataFetch({ user: fakeUser }));

    return promise;
  });

  it('should trigger an error', async () => {
    mockNetworkError(mockAxios);
    const promise = new Promise((resolve) => {
      store.subscribe(() => {
        const actions = store.getActions();
        if (actions.length === expectedActionsError.length) {
          expect(actions).toEqual(expectedActionsError);
          resolve(undefined);
        }
      });
    });
    store.dispatch(changeUserDataFetch({ user: fakeUser }));

    return promise;
  });
});
