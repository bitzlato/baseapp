import { Blockchain } from './types';

export const DEFAULT_BLOCKCHAIN: Blockchain = {
  explorer_address: '',
  explorer_transaction: '',
  height: 1500000,
  id: 2,
  is_transaction_price_too_high: false,
  key: 'btc-testnet',
  min_confirmations: 6,
  name: 'Bitcoin Testnet',
  status: 'disabled',
};
