import { Currency, Money } from '@bitzlato/money-js';

export interface CurrencySource {
  id: string;
  name: string;
  symbol: string;
  explorer_transaction: string;
  explorer_address: string;
  type: 'fiat' | 'coin';
  deposit_fee: string;
  min_confirmations: number;
  min_deposit_amount: string;
  withdraw_fee: string;
  min_withdraw_amount: string;
  deposit_enabled: boolean;
  withdrawal_enabled: boolean;
  withdrawal_disabled_reason: string;
  base_factor: number;
  precision: number;
  icon_url: string;
  icon_id: string;
  price: string;
}

export interface ApiCurrency
  extends Omit<
      CurrencySource,
      'deposit_fee' | 'min_deposit_amount' | 'withdraw_fee' | 'min_withdraw_amount'
    >,
    Currency {
  deposit_fee: Money;
  min_deposit_amount: Money;
  withdraw_fee: Money;
  min_withdraw_amount: Money;
}
