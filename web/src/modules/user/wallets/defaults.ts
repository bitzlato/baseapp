import { DEFAULT_CCY_PRECISION } from 'src/constants';
import { createCcy, createMoney } from 'src/helpers/money';
import type { Wallet } from './types';

const currency = createCcy('', DEFAULT_CCY_PRECISION);
const zeroMoney = createMoney(0, currency);

export const defaultWallet: Wallet = {
  name: '',
  currency,
  balance: zeroMoney,
  type: 'coin',
  precision: DEFAULT_CCY_PRECISION,
  withdraw_fee: zeroMoney,
  icon_id: '',
  locked: zeroMoney,
  limit_24_hour: zeroMoney,
  limit_1_month: zeroMoney,
  min_withdraw_amount: zeroMoney,
  explorer_transaction: '',
  explorer_address: '',
  icon_url: '',
  price: '0',
};
