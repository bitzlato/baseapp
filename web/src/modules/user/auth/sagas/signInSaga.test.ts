import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootSaga, sendError } from '../../..';
import { mockNetworkError, setupMockAxios, setupMockStore } from '../../../../helpers/jest';
import { changeLanguage } from '../../../public/i18n';
import { CommonError } from '../../../types';
import { User, userData } from '../../profile';
import { DEFAULT_TEST_BITZLATO_USER } from '../../profile/defaults';
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
