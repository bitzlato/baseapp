import type { Currency, Money } from '@bitzlato/money-js';
import type { AccountBalance, AccountBalanceSource } from 'src/modules/public/accounts/types';
import type { ApiCurrency, CurrencySource } from 'src/modules/public/currencies/types';

export interface WalletSource extends AccountBalanceSource, CurrencySource {}

export interface Wallet extends AccountBalance, ApiCurrency {}

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
