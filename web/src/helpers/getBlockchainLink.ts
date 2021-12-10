import { Wallet } from 'src/modules/user/wallets/types';

export function getBlockchainLink(wallet: Wallet | undefined, txid: string, rid?: string) {
  if (wallet) {
    if (txid && wallet.explorer_transaction) {
      return wallet.explorer_transaction.replace('#{txid}', txid);
    }
    if (rid && wallet.explorer_address) {
      return wallet.explorer_address.replace('#{address}', rid);
    }
  }

  return '';
}
