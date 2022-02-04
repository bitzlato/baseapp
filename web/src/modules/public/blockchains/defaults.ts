import { Blockchain } from './types';

export const DEFAULT_BLOCKCHAIN: Blockchain = {
  explorer_address: 'https://testnet.blockchain.info/address/#{address}',
  explorer_transaction: 'https://testnet.blockchain.info/tx/#{txid}',
  height: 1500000,
  id: 2,
  is_transaction_price_too_high: false,
  key: 'btc-testnet',
  min_confirmations: 6,
  name: 'Bitcoin Testnet',
  status: 'disabled',
};
