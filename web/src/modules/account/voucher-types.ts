export interface AccountVoucher {
  active: boolean;
  amount: string;
  cashed_at: string | null;
  cashed_by: AccountUser | null;
  cc_code: string;
  comment: string | null;
  converted_amount: string;
  created_at: string;
  currency: string;
  deep_link_code: string;
  deleted_at: string | null;
  id: number;
  links?: P2PVoucherLink[];
  user: AccountUser;
}

interface AccountUser {
  id: string;
  nickname: string;
  profile_name: string;
}

export interface P2PVouchers {
  total: number;
  data: P2PVoucher[];
}

export interface P2PVouchersParams {
  limit: number;
  skip: number;
}

export interface P2VoucherPostParams {
  amount: string;
  cryptocurrency: string;
  currency: string;
  method: 'crypto' | 'fiat';
  comment?: string;
  cashTimes?: number;
}

export interface P2PVoucherCachedBy {
  cashedAt: number;
  cashedBy: string;
  comment: string | null;
}

export interface P2PVoucher {
  deepLinkCode: string;
  currency: P2PCurrency;
  cryptocurrency: P2PCurrency;
  createdAt: number;
  createdBy?: string | null;
  links: P2PVoucherLink[];
  status: 'active' | 'cashed';
  cashedBy: P2PVoucherCachedBy[] | null;
  cashedTimes: number;
  comment: string | null;
  holdAmount: P2PCurrency;
  timesToWithdrawal: number;
  validTill: null;
}

interface P2PCurrency {
  code: string;
  amount: string;
}

export interface P2PVoucherLink {
  label: string;
  type: string;
  url: string;
}

export interface P2PConfirmation {
  email: string;
  expiresAt: number;
}

export interface P2PError {
  code: string;
  message: string;
}
