import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootSaga, sendError, User } from '../../..';
import { mockNetworkError, setupMockAxios, setupMockStore } from '../../../../helpers/jest';
import { CommonError } from '../../../types';
import { changeUserDataError, changeUserDataFetch } from '../actions';

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
    labels: [],
    phone: [],
    created_at: '',
    updated_at: '',
    bitzlato_user: {
      id: 14716789,
      nickname: 'nickname',
      email_verified: true,
      '2fa_enabled': false,
      email: 'email@gmail.com',
      user_profile: {
        id: 2608888,
        user_id: 14716789,
        lang: 'ru',
        lang_web: 'en',
        currency: 'USD',
        cryptocurrency: 'BTC',
        rating: '0.0',
        verified: false,
        timezone: 'Europe/Kirov',
        safe_mode_enabled: true,
        self_frozen: false,
        public_name: null,
        generated_name: 'OddKraig',
        avatar: {
          original: '',
          thumbnail: '',
        },
      },
      user_setting: {
        id: 123123,
        save_requisites: true,
        new_referral: 'off',
        user_message: 'off',
        comission_return: 'off',
        dividends_received: 'off',
      },
    },
    default_auth_subject: null,
    available_auth_subjects: [],
    kyc_verification_url: '',
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
