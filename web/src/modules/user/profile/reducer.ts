import { CommonError } from '../../types';
import { ProfileAction } from './actions';
import {
  PROFILE_CHANGE_PASSWORD_DATA,
  PROFILE_CHANGE_PASSWORD_ERROR,
  PROFILE_CHANGE_PASSWORD_FETCH,
  PROFILE_CHANGE_PASSWORD_RESET,
  PROFILE_CHANGE_USER_DATA,
  PROFILE_CHANGE_USER_ERROR,
  PROFILE_CHANGE_USER_FETCH,
  PROFILE_CHANGE_USER_LEVEL,
  PROFILE_GENERATE_2FA_QRCODE_DATA,
  PROFILE_GENERATE_2FA_QRCODE_ERROR,
  PROFILE_GENERATE_2FA_QRCODE_FETCH,
  PROFILE_TOGGLE_2FA_SUCCESS,
  PROFILE_RESET_USER,
  PROFILE_TOGGLE_2FA_DATA,
  PROFILE_TOGGLE_2FA_ERROR,
  PROFILE_TOGGLE_2FA_FETCH,
  PROFILE_TOGGLE_USER_2FA,
  PROFILE_USER_DATA,
  PROFILE_USER_ERROR,
  PROFILE_USER_FETCH,
  PROFILE_TOGGLE_NEED_VERIFICATION,
} from './constants';
import { User } from './types';

export interface ProfileState {
  passwordChange: {
    success?: boolean;
    error?: CommonError | undefined;
  };
  twoFactorAuth: {
    barcode: string;
    url: string;
    success?: boolean;
    error?: CommonError | undefined;
  };
  userData: {
    user: User;
    error?: CommonError;
    isFetching: boolean;
    success?: boolean;
    verifyEmail: boolean;
    needVerification: boolean;
  };
}

export const defaultUser: User = {
  username: '',
  email: '',
  level: 0,
  otp: false,
  role: '',
  state: '',
  uid: '',
  profiles: [],
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
      suspicious: false,
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
  account_statements_url: '',
  email_verified: true,
};

export const initialStateProfile: ProfileState = {
  passwordChange: {
    success: false,
  },
  twoFactorAuth: {
    barcode: '',
    url: '',
  },
  userData: {
    user: defaultUser,
    isFetching: true,
    verifyEmail: false,
    needVerification: false,
  },
};

const passwordChangeReducer = (state: ProfileState['passwordChange'], action: ProfileAction) => {
  switch (action.type) {
    case PROFILE_CHANGE_PASSWORD_FETCH:
      return {
        ...state,
        success: false,
        error: undefined,
      };
    case PROFILE_CHANGE_PASSWORD_DATA:
      return {
        ...state,
        success: true,
        error: undefined,
      };
    case PROFILE_CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case PROFILE_CHANGE_PASSWORD_RESET:
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};

const twoAuthReducer = (
  state: ProfileState['twoFactorAuth'],
  action: ProfileAction,
): ProfileState['twoFactorAuth'] => {
  switch (action.type) {
    case PROFILE_GENERATE_2FA_QRCODE_FETCH:
      return {
        ...state,
        success: false,
        error: undefined,
        barcode: '',
        url: '',
      };
    case PROFILE_GENERATE_2FA_QRCODE_DATA:
      return {
        ...state,
        error: undefined,
        barcode: action.payload.barcode,
        url: action.payload.url,
      };
    case PROFILE_GENERATE_2FA_QRCODE_ERROR:
      return {
        ...state,
        success: false,
        error: action.error,
        barcode: '',
        url: '',
      };
    case PROFILE_TOGGLE_2FA_FETCH:
      return {
        ...state,
        success: false,
        error: undefined,
      };
    case PROFILE_TOGGLE_2FA_DATA:
      return {
        ...state,
        success: true,
        error: undefined,
      };
    case PROFILE_TOGGLE_2FA_ERROR:
      return {
        ...state,
        success: false,
        error: action.error,
      };
    case PROFILE_TOGGLE_2FA_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

const userReducer = (
  state: ProfileState['userData'],
  action: ProfileAction,
): ProfileState['userData'] => {
  switch (action.type) {
    case PROFILE_USER_FETCH:
      return {
        ...state,
        isFetching: true,
        verifyEmail: false,
      };
    case PROFILE_USER_DATA:
      return {
        ...state,
        isFetching: false,
        verifyEmail: false,
        user: action.payload.user,
      };
    case PROFILE_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        verifyEmail: action.error.message.indexOf('identity.session.auth0.email_not_verified') > -1,
      };
    case PROFILE_RESET_USER:
      return {
        ...state,
        user: initialStateProfile.userData.user,
      };
    case PROFILE_CHANGE_USER_LEVEL:
      return {
        ...state,
        user: {
          ...state.user,
          level: action.payload.level,
        },
      };
    case PROFILE_TOGGLE_USER_2FA:
      return {
        ...state,
        user: {
          ...state.user,
          otp: !state.user.otp,
        },
      };
    case PROFILE_CHANGE_USER_FETCH:
      return {
        ...state,
        success: false,
      };
    case PROFILE_CHANGE_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          data:
            (action.payload && action.payload.user && action.payload.user.data) || state.user.data,
        },
        success: true,
      };
    case PROFILE_CHANGE_USER_ERROR:
      return {
        ...state,
        success: false,
      };
    case PROFILE_TOGGLE_NEED_VERIFICATION:
      return {
        ...state,
        needVerification: action.payload.needVerification,
      };
    default:
      return state;
  }
};

export const profileReducer = (
  state = initialStateProfile,
  action: ProfileAction,
): ProfileState => {
  switch (action.type) {
    case PROFILE_CHANGE_PASSWORD_FETCH:
    case PROFILE_CHANGE_PASSWORD_DATA:
    case PROFILE_CHANGE_PASSWORD_ERROR:
    case PROFILE_CHANGE_PASSWORD_RESET:
      const passwordChangeState = { ...state.passwordChange };

      return {
        ...state,
        passwordChange: passwordChangeReducer(passwordChangeState, action),
      };

    case PROFILE_GENERATE_2FA_QRCODE_FETCH:
    case PROFILE_GENERATE_2FA_QRCODE_DATA:
    case PROFILE_GENERATE_2FA_QRCODE_ERROR:
    case PROFILE_TOGGLE_2FA_FETCH:
    case PROFILE_TOGGLE_2FA_DATA:
    case PROFILE_TOGGLE_2FA_ERROR:
    case PROFILE_TOGGLE_2FA_SUCCESS:
      const twoFactorAuthState = { ...state.twoFactorAuth };

      return {
        ...state,
        twoFactorAuth: twoAuthReducer(twoFactorAuthState, action),
      };

    case PROFILE_USER_FETCH:
    case PROFILE_USER_DATA:
    case PROFILE_RESET_USER:
    case PROFILE_USER_ERROR:
    case PROFILE_CHANGE_USER_LEVEL:
    case PROFILE_TOGGLE_USER_2FA:
    case PROFILE_CHANGE_USER_FETCH:
    case PROFILE_CHANGE_USER_DATA:
    case PROFILE_CHANGE_USER_ERROR:
    case PROFILE_TOGGLE_NEED_VERIFICATION:
      const userState = { ...state.userData };

      return {
        ...state,
        userData: userReducer(userState, action),
      };

    default:
      return state;
  }
};
