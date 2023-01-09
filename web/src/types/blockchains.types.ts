import { Money } from '@bitzlato/money-js';

export interface BlockchainFeesSource {
  blockchain_key: string;
  native_fee: {
    currency_id: string;
    low?: string | undefined;
    market?: string | undefined;
    aggressive?: string | undefined;
  };
  currency_fee: {
    currency_id: string;
    low?: string | undefined;
    market?: string | undefined;
    aggressive?: string | undefined;
  };
  at: string;
}

export interface BlockchainFees extends BlockchainFeesSource {
  fees: {
    currency_id: string;
    low?: Money | undefined;
    lowInFiat?: Money | undefined;
    market?: Money | undefined;
    marketInFiat?: Money | undefined;
    aggressive?: Money | undefined;
    aggressiveInFiat?: Money | undefined;
    native: {
      low?: Money | undefined;
      aggressive?: Money | undefined;
      market?: Money | undefined;
    };
  };
}
