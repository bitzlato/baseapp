export type MarketId = string;

export interface MarketFilterCustomStepRule {
  limit: string;
  step: string;
}

export interface MarketFilterCustomStep {
  type: string;
  rules: MarketFilterCustomStepRule[];
}

export interface MarketFilterSignificantDigit {
  type: string;
  digits: number;
}

export type MarketFilter = MarketFilterSignificantDigit | MarketFilterCustomStep;

export interface Market {
  id: MarketId;
  name: string;
  base_unit: string;
  quote_unit: string;
  min_price: string;
  max_price: string;
  min_amount: string;
  amount_precision: number;
  price_precision: number;
  state?: string;
  filters?: MarketFilter[];
}

export interface Ticker {
  amount: string;
  avg_price: string;
  high: string;
  last: string;
  low: string;
  open: number | string;
  price_change_percent: string;
  volume: string;
}

export interface TickerEvent {
  amount: string;
  name: string;
  base_unit: string;
  quote_unit: string;
  low: string;
  high: string;
  open: number;
  last: string;
  avg_price: string;
  price_change_percent: string;
  volume: string;
  at: number;
}

export interface MarketPriceParams {
  from_currency: string;
  to_currency: string;
  request_volume: string;
  request_currency: string;
}

export interface MarketPriceResponse {
  from_currency: string; // 'eth';
  from_volume: string; // '0.1025498';
  inverse_price: string; // '0.13979994';
  request_currency: string; // 'eth';
  request_price: string; // '7.153079';
  request_volume: string; // '0.1025498';
  to_currency: string; // 'bnb';
  to_volume: string; // '0.7335';
}
