import { defaultAccount } from 'src/modules/public/accounts/defaults';
import { defaultCurrency } from 'src/modules/public/currencies/defaults';
import type { Wallet } from './types';

export const defaultWallet: Wallet = {
  ...defaultAccount,
  ...defaultCurrency,
};
