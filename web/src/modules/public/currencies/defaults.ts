import { DEFAULT_CCY_PRECISION } from 'src/constants';
import { createCcy, createMoney } from 'src/helpers/money';

import { ApiCurrency, CurrencySource } from './types';

export const DEFAULT_CURRENCY = createCcy('', DEFAULT_CCY_PRECISION);

export const defaultCurrency: ApiCurrency = {
  blockchain_currencies: [],
  blockchain_ids: [],
  cc_code: '',
  deposit_enabled: true,
  deposit_fee: createMoney(0, DEFAULT_CURRENCY),
  description: null,
  homepage: null,
  icon_id: '',
  icon_url: '',
  id: '',
  min_withdraw_amount: createMoney(0, DEFAULT_CURRENCY),
  name: '',
  position: 0,
  precision: 8,
  price: '1.0',
  type: 'coin',
  withdraw_limit_24h: '0',
  withdraw_limit_72h: '0',
  withdrawal_enabled: true,
  ...DEFAULT_CURRENCY,
};

export const defaultCurrencySource: CurrencySource = {
  blockchain_currencies: [],
  blockchain_ids: [],
  cc_code: '',
  deposit_enabled: true,
  deposit_fee: '0',
  description: null,
  homepage: null,
  icon_id: '',
  icon_url: '',
  id: '',
  min_withdraw_amount: '0',
  name: '',
  position: 0,
  precision: 8,
  price: '1.0',
  type: 'coin',
  withdraw_limit_24h: '0',
  withdraw_limit_72h: '0',
  withdrawal_enabled: true,
};
