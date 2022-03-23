import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootSaga, sendError } from '../../..';
import { mockNetworkError, setupMockAxios, setupMockStore } from '../../../../helpers/jest';
import { changeLanguage } from '../../../public/i18n';
import { CommonError } from '../../../types';
import { User, userData } from '../../profile';
import { signIn, signInError, signInRequire2FA } from '../actions';

describe('SignIn saga', () => {
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

  const fakeCredentials = { email: 'john.barong@gmail.com', password: '123123' };

  const fakeUser: User = {
    username: 'johnny1337',
    email: 'admin@barong.io',
    uid: 'ID26C901376F',
    role: 'admin',
    level: 3,
    otp: false,
    state: 'active',
    profiles: [],
    data: '{"language":"en"}',
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

  const mockSignIn = () => {
    mockAxios.onPost('/identity/sessions').reply(200, fakeUser);
  };

  const error: CommonError = {
    code: 500,
    message: ['Server error'],
  };

  const expectedActionsFetch = [
    signIn(fakeCredentials),
    changeLanguage('en'),
    userData({ user: fakeUser }),
    signInRequire2FA({ require2fa: false }),
  ];

  const expectedActionsNetworkError = [
    signIn(fakeCredentials),
    sendError({
      error,
      processingType: 'alert',
      extraOptions: {
        actionError: signInError,
      },
    }),
  ];

  it('should signin user in success flow', async () => {
    mockSignIn();
    const promise = new Promise((resolve) => {
      store.subscribe(() => {
        const actions = store.getActions();
        if (actions.length === expectedActionsFetch.length) {
          expect(actions).toEqual(expectedActionsFetch);
          resolve(undefined);
        }
      });
    });

    store.dispatch(signIn(fakeCredentials));

    return promise;
  });

  it('should trigger network error', async () => {
    mockNetworkError(mockAxios);
    const promise = new Promise((resolve) => {
      store.subscribe(() => {
        const actions = store.getActions();
        if (actions.length === expectedActionsNetworkError.length) {
          expect(actions).toEqual(expectedActionsNetworkError);
          resolve(undefined);
        }
      });
    });
    store.dispatch(signIn(fakeCredentials));

    return promise;
  });
});
