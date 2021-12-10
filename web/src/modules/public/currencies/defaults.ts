import { DEFAULT_CCY_PRECISION } from 'src/constants';
import { createCcy, createMoney } from 'src/helpers/money';

import { ApiCurrency } from './types';

export const DEFAULT_CURRENCY = createCcy('', DEFAULT_CCY_PRECISION);

export const defaultCurrency: ApiCurrency = {
  id: '',
  name: '',
  symbol: '',
  explorer_transaction: '',
  explorer_address: '',
  type: 'coin',
  deposit_fee: createMoney(0, DEFAULT_CURRENCY),
  min_confirmations: 6,
  min_deposit_amount: createMoney(0, DEFAULT_CURRENCY),
  withdraw_fee: createMoney(0, DEFAULT_CURRENCY),
  min_withdraw_amount: createMoney(0, DEFAULT_CURRENCY),
  deposit_enabled: true,
  withdrawal_enabled: true,
  withdrawal_disabled_reason: '',
  base_factor: 100000000,
  precision: 8,
  icon_url: '',
  icon_id: '',
  price: '1.0',
  ...DEFAULT_CURRENCY,
};
