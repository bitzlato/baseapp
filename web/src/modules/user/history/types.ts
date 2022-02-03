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
  currency: string;
  id: number;
  type: string;
  amount: string;
  fee: string;
  blockchain_txid: string;
  rid: string;
  state: WithdrawState;
  created_at: string;
  updated_at: string;
  completed_at: string;
  done_at: string;
  price?: number;
  confirmations: number;
  public_message?: string;
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
  currency: string;
  id: number;
  amount: string;
  fee: string;
  txid: string;
  created_at: string;
  confirmations: number;
  completed_at: string;
  state: DepositState;
  price?: number;
  public_message?: string;
  transfer_links?: TransferLink[];
  transfer_type?: string;
  tid?: string;
}

export interface TransferLink {
  title: string;
  url: string;
}

export type WalletHistoryElement = Withdraw | Deposit | PrivateTrade;
export type WalletHistoryList = WalletHistoryElement[];
