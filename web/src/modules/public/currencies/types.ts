import { Currency, Money } from '@bitzlato/money-js';

interface BlockchainCurrency {
  blockchain_id: number;
  blockchain_key: string;
  min_deposit_amount: string;
  withdraw_fee: string;
}

export interface BlockchainCurrencyMoney {
  blockchain_id: number;
  blockchain_key: string;
  min_deposit_amount: Money;
  withdraw_fee: Money;
}

export interface CurrencySource {
  blockchain_currencies: BlockchainCurrency[];
  cc_code: string | null;
  deposit_enabled: boolean;
  deposit_fee: string;
  description: string | null;
  homepage: string | null;
  icon_id: string;
  icon_url?: string;
  id: string;
  min_withdraw_amount: string;
  name: string;
  position: number;
  precision: number;
  price: string;
  type: 'coin' | 'fiat';
  withdraw_limit_24h: string;
  withdraw_limit_72h: string;
  withdrawal_enabled: boolean;
}

export interface ApiCurrency
  extends Omit<CurrencySource, 'deposit_fee' | 'min_withdraw_amount' | 'blockchain_currencies'>,
    Currency {
  deposit_fee: Money;
  min_withdraw_amount: Money;
  blockchain_currencies: BlockchainCurrencyMoney[];
}

export interface P2PCurrency {
  name: string;
  code: string;
  sign: string;
}

export type P2PCurrencies = P2PCurrency[];

export interface P2PCurrencyOption {
  value: string;
  label: string;
}
