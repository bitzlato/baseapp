export interface P2PWalletStat {
  code: string;
  depositEnabled: boolean;
  fee: number;
  inputHour: number;
  minAcceptableDeposit: string;
  minFee: number;
  minWithdrawal: string;
  paymentsError: number;
  paymentsHour: number;
  paymentsQueue: number;
  unconfirmed: number;
  withdrawEnabled: boolean;
}

export interface P2PWallet {
  cryptocurrency: string;
  balance: string;
  holdBalance: string;
  address: string | null;
  createdAt: number;
  worth: {
    currency: string;
    value: string;
    holdValue: string;
  };
}

export interface P2PCurrency {
  name: string;
  code: string;
  minWithdrawal: string;
  minAcceptableDeposit: string;
  available: ('p2p' | 'market')[];
}

export interface P2PGenerateParams {
  cryptocurrency: string;
}
