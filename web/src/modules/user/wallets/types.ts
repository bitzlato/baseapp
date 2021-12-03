import { Currency, Money } from '@bitzlato/money-js';

export interface WalletSource {
  currency: string;
  balance?: string;
  locked?: string;
  active?: boolean;
  enable_invoice?: boolean;
  deposit_address?: WalletAddress;
  // from Currency
  name: string;
  type: 'fiat' | 'coin';
  fee: number;
  fixed: number;
  iconUrl?: string;
  explorerTransaction?: string;
  explorerAddress?: string;
  icon_id: string;
  price: string;
}

export interface Wallet extends Omit<WalletSource, 'currency' | 'balance' | 'locked' | 'fee'> {
  currency: Currency;
  balance?: Money;
  locked?: Money;
  fee: Money;
}

export interface WalletAddress {
  address: string;
  currencies: string[];
  state?: string;
}

export interface WalletWithdrawCCY {
  amount: string;
  currency: string;
  otp: string;
  beneficiary_id: string;
}

export interface WalletWithdrawFiat {
  amount: string;
  currency: string;
  currency_type: string;
  otp: string;
  beneficiary_id: string;
}

export interface AccountInterface {
  currency: string;
  balance?: string;
  locked?: string;
  deposit_address?: WalletAddress;
}
