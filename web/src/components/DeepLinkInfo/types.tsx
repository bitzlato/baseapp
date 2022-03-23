export enum DeeplinkTypes {
  Ad = 'ad',
  Voucher = 'voucher',
}

export type DeepLinkInfoType = {
  active: boolean;
  code: string;
  payload: DeeplinkPayloadVoucher | DeeplinkPayloadAd;
  referrer_id: number;
  type?: DeeplinkTypes;
};

export interface DeeplinkPayloadVoucher {
  amount: string;
  cashed_at?: string;
  cc_code: string;
  comment?: string;
  converted_amount: string;
  currency: string;
  user: {
    nickname: string;
    profile_name: string;
  };
}

export interface DeeplinkPayloadAd {
  cc_code: string;
  deleted_at?: string;
  details?: string;
  liquidity_limit: boolean;
  max_amount?: string;
  min_amount?: string;
  rate_value?: string;
  ratepercent?: string;
  status: string;
  terms: string;
  type: 'buying' | 'selling';
  verified_only: false;
}
