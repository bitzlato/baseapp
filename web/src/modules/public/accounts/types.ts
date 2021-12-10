import type { Currency as MoneyCurrency, Money } from '@bitzlato/money-js';

export interface AccountBalanceSource {
  currency: string;
  balance: string;
  locked: string;
  limit_24_hour: string;
  limit_1_month: string;
  enable_invoice?: boolean;
  deposit_address?: WalletAddress;
}

export interface WalletAddress {
  address: string;
  currencies: string[];
  state?: string;
}

export interface AccountBalance
  extends Omit<AccountBalanceSource, 'balance' | 'locked' | 'limit_24_hour' | 'limit_1_month'>,
    MoneyCurrency {
  balance: Money;
  locked: Money;
  limit_24_hour: Money;
  limit_1_month: Money;
}
