export interface GeneralBalance {
  id: string;
  currency_id: string;
  p2p_balance: string | null;
  p2p_hold: string | null;
  p2p_updated_at: string | null;
  market_balance: string | null;
  market_hold: string | null;
  market_updated_at: string | null;
}

export interface TotalBalance {
  currency_id: string;
  balance: string;
  hold: string;
}

export interface TotalBalances {
  total: TotalBalance[];
  p2p: TotalBalance[];
  spot: TotalBalance[];
}

export type WalletType = 'p2p' | 'market';

export interface TransferPost {
  source: WalletType;
  destination: WalletType;
  currency_id: string;
  amount: string;
  description: string;
}

export interface TransferRecord {
  id: number;
  created_at: string;
  updated_at: string;
  currency_id: string;
  user_id: number;
  amount: string;
  source: WalletType;
  destination: WalletType;
  peatio_member_uid: string;
  receiving_state: string;
  sending_state: string;
  description: string;
  meta: {};
  public_state: 'processing' | 'transfered' | 'canceled';
}
