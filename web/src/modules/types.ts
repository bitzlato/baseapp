import { TickerEvent } from './public/markets/types';
import { MarketsState } from './public/markets/reducer';
import { OrderBookState } from './public/orderBook/types';
import { OrdersState } from './user/orders/reducer';

export interface CommonError {
  code: number;
  message: string[];
  payload?: Record<string, string>;
}

export interface CommonState {
  error?: CommonError | undefined;
  loading?: boolean;
}

export type OrderStatusType = 'wait' | 'done' | 'cancel' | 'pending' | 'reject';
export type OrderSide = 'sell' | 'buy';
export type OrderType =
  | 'limit'
  | 'market'
  | 'stop_loss'
  | 'stop_limit'
  | 'take_profit'
  | 'take_limit';
export type OrderKind = 'bid' | 'ask';

export interface OrderCommon {
  price: string | null;
  state: OrderStatusType;
  remaining_volume: string;
  origin_volume: string;
  executed_volume?: string | undefined;
  side: OrderSide;
  market: string;
  ord_type?: OrderType | undefined;
  avg_price?: string;
  volume?: number;
  trigger_price?: string | undefined;
  created_at?: string | number | undefined;
  updated_at?: string | number | undefined;
  triggered_at?: string | undefined;
  confirmed?: boolean | undefined;
  uuid?: string | undefined;
  id?: number | undefined;
  kind?: OrderKind | undefined;
  trades_count?: number | undefined;
}

export interface OrderEvent extends OrderCommon {
  at: number;
  order_type?: OrderType;
}

export interface MarketUpdateEvent {
  asks: Array<[number, number]>;
  bids: Array<[number, number]>;
}

export type RangerEvent = TickerEvent | OrderEvent | MarketUpdateEvent;

export interface CoreState {
  orders: OrdersState;
  orderBook: OrderBookState;
  markets: MarketsState;
}

export interface ClientState {
  coreData: CoreState;
}

export interface SessionsMeClaims {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  nonce: string;
}
export interface SessionsMe {
  auth_sub: string;
  claims: SessionsMeClaims;
}
