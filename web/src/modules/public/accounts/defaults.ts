import { createMoney } from 'src/helpers/money';
import { DEFAULT_CURRENCY } from '../currencies/defaults';
import { AccountBalance } from './types';

export const defaultAccount: AccountBalance = {
  ...DEFAULT_CURRENCY,
  currency: DEFAULT_CURRENCY,
  balance: createMoney(0, DEFAULT_CURRENCY),
  locked: createMoney(0, DEFAULT_CURRENCY),
  limit_24_hour: createMoney(0, DEFAULT_CURRENCY),
  limit_1_month: createMoney(0, DEFAULT_CURRENCY),
};
