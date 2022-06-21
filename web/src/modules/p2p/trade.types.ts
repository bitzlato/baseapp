import { MoneyCurrency } from 'web/src/types';
import { AdvertType, P2PCryptoCurrency, PaymethodSource } from './types';

export type TradeType = AdvertType;

export type TradeAmountType = 'fiat' | 'crypto';

export type TradeStatus =
  | 'cancel'
  | 'confirm_payment'
  | 'confirm_trade'
  | 'dispute'
  | 'payment'
  | 'trade_created';

export interface TradeSource {
  id: number;
  currency: P2PCryptoCurrency;
  cryptocurrency: P2PCryptoCurrency;
  rate: string;
  partner: string;
  type: TradeType;
  paymethod: number;
  status: TradeStatus;
  date: number;
}

export interface Trade extends Omit<TradeSource, 'currency' | 'cryptocurrency' | 'paymethod'> {
  paymethod: PaymethodSource;
  currency: P2PCryptoCurrency & { moneyCurrency: MoneyCurrency };
  cryptoCurrency: P2PCryptoCurrency & { moneyCurrency: MoneyCurrency };
}
