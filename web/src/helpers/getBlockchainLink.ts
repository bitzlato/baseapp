import { Blockchain } from 'src/modules/public/blockchains/types';

export function getBlockchainLink(blockchain: Blockchain, txid: string, rid?: string): string {
  if (txid && blockchain.explorer_transaction) {
    return blockchain.explorer_transaction.replace('#{txid}', txid);
  }
  if (rid && blockchain.explorer_address) {
    return blockchain.explorer_address.replace('#{address}', rid);
  }
  return '';
}
