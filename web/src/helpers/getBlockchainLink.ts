import { Wallet } from "src/modules/user/wallets/types";

export function getBlockchainLink(wallets: Wallet[], currency: string, txid: string, rid?: string) {
    const currencyInfo = wallets && wallets.find(wallet => wallet.currency === currency);
    if (currencyInfo) {
        if (txid && currencyInfo.explorerTransaction) {
            return currencyInfo.explorerTransaction.replace('#{txid}', txid);
        }
        if (rid && currencyInfo.explorerAddress) {
            return currencyInfo.explorerAddress.replace('#{address}', rid);
        }
    }
    return '';
}

