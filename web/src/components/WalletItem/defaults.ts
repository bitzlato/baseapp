import { ZERO_PENCE } from 'web/src/helpers/money';
import { WalletItemData } from './WalletItem';

export const DEFAULT_WALLET_ITEM: WalletItemData = {
  name: '',
  currency: '',
  balanceTotal: ZERO_PENCE,
  balanceP2P: ZERO_PENCE,
  balanceMarket: ZERO_PENCE,
  approximate: ZERO_PENCE,
  locked: ZERO_PENCE,
  hasDepositWithdraw: false,
  hasTransfer: false,
  hasGift: false,
  index: -1,
};
