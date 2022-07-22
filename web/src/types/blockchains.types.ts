import { Money } from '@bitzlato/money-js';

export interface BlockchainFeesSource {
  blockchain_key: string;
  native_fee: {
    currency_id: string;
    low: string;
    market: string;
    aggressive: string;
  };
  currency_fee: {
    currency_id: string;
    low: string;
    market: string;
    aggressive: string;
  };
  at: string;
}

export interface BlockchainFees extends BlockchainFeesSource {
  fees: {
    currency_id: string;
    low: Money;
    lowInFiat?: Money | undefined;
    market: Money;
    marketInFiat?: Money | undefined;
    aggressive: Money;
    aggressiveInFiat?: Money | undefined;
  };
}
