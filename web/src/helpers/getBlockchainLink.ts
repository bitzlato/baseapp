import { Wallet } from 'src/modules/user/wallets/types';

export function getBlockchainLink(wallet: Wallet | undefined, txid: string, rid?: string) {
  if (wallet) {
    if (txid && wallet.explorerTransaction) {
      return wallet.explorerTransaction.replace('#{txid}', txid);
    }
    if (rid && wallet.explorerAddress) {
      return wallet.explorerAddress.replace('#{address}', rid);
    }
  }

  return '';
}
