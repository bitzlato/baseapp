import { BitzlatoUser } from './types';

export const DEFAULT_TEST_BITZLATO_USER: BitzlatoUser = {
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
    verification_status: 'not_verified',
    verified_at: null,
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
};
