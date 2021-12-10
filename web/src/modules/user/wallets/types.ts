import type { Currency, Money } from '@bitzlato/money-js';
import type { AccountBalanceSource } from 'src/modules/public/accounts/types';

export interface WalletSource extends AccountBalanceSource {
  // from CurrencySource
  name: string;
  type: 'fiat' | 'coin';
  withdraw_fee: string;
  precision: number;
  icon_url?: string;
  explorer_transaction?: string;
  explorer_address?: string;
  icon_id: string;
  price: string;
  min_withdraw_amount: string;
}

export interface Wallet
  extends Omit<
    WalletSource,
    | 'currency'
    | 'balance'
    | 'locked'
    | 'limit_24_hour'
    | 'limit_1_month'
    | 'withdraw_fee'
    | 'min_withdraw_amount'
  > {
  currency: Currency;
  balance: Money;
  locked: Money;
  limit_24_hour: Money;
  limit_1_month: Money;
  withdraw_fee: Money;
  min_withdraw_amount: Money;
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
