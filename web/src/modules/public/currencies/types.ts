import { Currency, Money } from '@bitzlato/money-js';

export interface CurrencySource {
  blockchain_ids: number[];
  cc_code: string;
  deposit_enabled: boolean;
  deposit_fee: string;
  description: string | null;
  homepage: string | null;
  icon_id: string;
  icon_url?: string;
  id: string;
  min_deposit_amount: string;
  min_withdraw_amount: string;
  name: string;
  position: number;
  precision: number;
  price: string;
  type: 'coin' | 'fiat';
  withdraw_fee: string;
  withdraw_limit_24h: string;
  withdraw_limit_72h: string;
  withdrawal_enabled: boolean;
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
