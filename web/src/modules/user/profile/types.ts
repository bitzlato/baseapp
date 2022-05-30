import { Money } from '@bitzlato/money-js';
import { Language } from 'web/src/types';
import { Label } from 'web/src/modules/user/kyc/label/actions';

export interface UserProfile {
  first_name: string;
  last_name: string;
  dob: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  state: string;
  created_at: string;
  updated_at: string;
  metadata?: string;
}

export interface Phone {
  country: string;
  number: string;
  validated_at: string | null;
}

export type NotificationSettingStatus =
  | 'off'
  | 'on'
  | 'silent'
  | 'no-nighttime'
  | 'silent'
  | 'silent,no-nighttime';
export interface BitzlatoUser {
  id: number;
  nickname?: string | null | undefined;
  email_verified: boolean;
  uid?: string | null | undefined;
  email: string;
  /**
   * @deprecated
   */
  '2fa_enabled': boolean;
  user_profile: {
    id: number;
    user_id: number;
    lang: Language;
    lang_web?: Language | null | undefined;
    currency: string;
    cryptocurrency: string;
    rating: string;
    verified: boolean;
    timezone?: string | null | undefined;
    safe_mode_enabled: boolean;
    self_frozen: boolean;
    public_name?: string | null | undefined;
    generated_name: string;
    avatar: {
      original: string;
      thumbnail: string;
    };
    suspicious: boolean;
  };
  user_setting: {
    id: number;
    save_requisites: boolean;
    notifications?: Record<string, string> | null | undefined;
    new_referral?: NotificationSettingStatus | null | undefined;
    user_message?: NotificationSettingStatus | null | undefined;
    comission_return?: NotificationSettingStatus | null | undefined;
    dividends_received?: NotificationSettingStatus | null | undefined;
  } | null;
}

export interface AuthSubject {
  subject: string;
  email: string;
  profile_name: string;
}

export interface User {
  username?: string;
  email: string;
  level: number;
  otp: boolean;
  role: string;
  state: string;
  uid: string;
  profiles: UserProfile[];
  csrf_token?: string;
  data?: string | undefined;
  referal_uid: string | null;
  labels: Label[];
  phone: Phone[];
  created_at: string;
  updated_at: string;
  bitzlato_user: BitzlatoUser | null;
  default_auth_subject?: string | null | undefined;
  available_auth_subjects: ReadonlyArray<AuthSubject>;
  kyc_verification_url: string;
  account_statements_url: string;
  email_verified: boolean;
}

export interface TradeStatistics {
  total_deals_count: number;
  total_positive_feedbacks_count: number;
  total_negative_feedbacks_count: number;
  trade_statistics: {
    id: number;
    user_id: number;
    cc_code: string;
    total_amount: string;
    total_count: number;
    success_deals: number;
    canceled_deals: number;
    positive_feedbacks_count: number;
    negative_feedbacks_count: number;
  }[];
}

export interface TradeStats {
  totalDeals: number;
  totalPositiveFeedbacksCount: number;
  totalNegativeFeedbacksCount: number;
  stats: TradeStat[];
}

export interface TradeStat {
  totalDeals: number;
  totalMoney: Money;
}

export interface ReferralLink {
  target: 'p2p' | 'market';
  type: string;
  url: string;
}

export interface P2PReport {
  code: number;
  description: string;
  format: string;
}

export interface ConfirmCodeParams {
  pin_code: string;
}
