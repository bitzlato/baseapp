import { Currency as MoneyCurrency, Money } from '@bitzlato/money-js';

import { Currency } from './types';

const moneyCurrency: MoneyCurrency = {
  code: '',
  minorUnit: 8,
};

export const defaultCurrency: Currency = {
  id: '',
  name: '',
  symbol: '',
  explorer_transaction: '',
  explorer_address: '',
  type: 'coin',
  deposit_fee: Money.fromDecimal(0, moneyCurrency),
  min_confirmations: 6,
  min_deposit_amount: Money.fromDecimal(0, moneyCurrency),
  withdraw_fee: Money.fromDecimal(0, moneyCurrency),
  min_withdraw_amount: Money.fromDecimal(0, moneyCurrency),
  withdraw_limit_24h: Money.fromDecimal(0, moneyCurrency),
  withdraw_limit_72h: Money.fromDecimal(0, moneyCurrency),
  deposit_enabled: true,
  withdrawal_enabled: true,
  withdrawal_disabled_reason: '',
  base_factor: 100000000,
  precision: 8,
  icon_url: '',
  icon_id: '',
  ...moneyCurrency,
};
