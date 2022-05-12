export type P2PWithdrawVoucherCount = {
  count: number;
};

export type P2PWithdrawInfo = {
  available: number;
  balance: number;
  maxFee: number;
  min: number;
  minBalance: number;
  minFee: number;
  fee?: number;
  voucher?: number;
};

export type P2PWithdrawalParams = {
  address: string;
  amount: string;
  voucher?: boolean;
};
