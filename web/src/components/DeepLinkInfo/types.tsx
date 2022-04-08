import { AccountVoucher } from 'web/src/modules/account/voucher-types';

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

export interface DeeplinkPayloadVoucher extends AccountVoucher {}

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
