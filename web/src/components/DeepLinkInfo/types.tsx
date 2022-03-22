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
  };
}

export interface DeeplinkPayloadAd {}
