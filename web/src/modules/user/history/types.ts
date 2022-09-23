import { CommonState } from '../../types';

export interface PublicTrade {
  id: number;
  price: string;
  total?: string;
  amount: string;
  market: string;
  created_at: string;
  taker_type: string;
  price_change?: string;
}

export interface PrivateTrade extends PublicTrade {
  side: string;
  order_id?: number;
}

export interface PrivateTradeEvent {
  id: number;
  price: string;
  total: string;
  amount: string;
  market: string;
  created_at: string;
  taker_type: string;
  side?: string;
  order_id?: number;
}

export interface PrivateTradesState extends CommonState {
  list: PrivateTrade[];
}

export type MakerType = 'buy' | 'sell';

export type WithdrawState =
  | 'prepared'
  | 'accepted'
  | 'canceled'
  | 'skipped'
  | 'to_reject'
  | 'rejected'
  | 'processing'
  | 'transfering'
  | 'under_review'
  | 'succeed'
  | 'failed'
  | 'errored'
  | 'confirming';

export interface Withdraw {
  amount: string;
  blockchain_id: number;
  blockchain_key: string;
  blockchain_txid: string;
  confirmations: number | null;
  created_at: string;
  currency: string;
  done_at: string;
  fee: string;
  id: number;
  note: string | null;
  price?: number;
  public_message?: string;
  rid: string;
  state: WithdrawState;
  transfer_type: string;
  type: string;
  updated_at: string;
}

export type DepositState =
  | 'submitted'
  | 'invoiced'
  | 'canceled'
  | 'rejected'
  | 'accepted'
  | 'skipped'
  | 'dispatched'
  | 'errored'
  | 'refunding';

export interface Deposit {
  amount: string;
  blockchain_id: number;
  blockchain_key: string;
  completed_at: string;
  confirmations: number | null;
  created_at: string;
  currency: string;
  fee: string;
  id: number;
  price?: number;
  public_message?: string;
  state: DepositState;
  tid?: string;
  transfer_links?: TransferLink[];
  transfer_type: string;
  txid: string;
}

export interface TransferLink {
  title: string;
  url: string;
}

export type WalletHistoryElement = Withdraw | Deposit | PrivateTrade;
export type WalletHistoryList = WalletHistoryElement[];
