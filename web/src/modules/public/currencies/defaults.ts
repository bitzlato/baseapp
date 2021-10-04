import { Currency } from './types';

export const defaultCurrency: Currency = {
  id: '',
  name: '',
  symbol: '',
  explorer_transaction: '',
  explorer_address: '',
  type: 'coin',
  deposit_fee: '0.0',
  min_confirmations: 6,
  min_deposit_amount: '0.0',
  withdraw_fee: '0.0',
  min_withdraw_amount: '0.0',
  withdraw_limit_24h: '0.0',
  withdraw_limit_72h: '0.0',
  deposit_enabled: true,
  withdrawal_enabled: true,
  base_factor: 100000000,
  precision: 8,
  icon_url: '',
  icon_id: '',
};
