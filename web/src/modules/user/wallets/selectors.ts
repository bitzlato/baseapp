import { Currency, Money } from '@trzmaxim/money';
import { RootState } from '../../';
import { WalletSource, Wallet } from './types';

const createWallet = (walletSource: WalletSource): Wallet => {
  const currency: Currency = {
    code: walletSource.currency.toUpperCase(),
    minorUnit: walletSource.fixed,
  };

  return {
    ...walletSource,
    currency,
    balance: walletSource.balance ? Money.fromDecimal(walletSource.balance, currency) : undefined,
    locked: walletSource.locked ? Money.fromDecimal(walletSource.locked, currency) : undefined,
    fee: Money.fromDecimal(walletSource.fee, currency),
  };
};

export const selectWallets = ({
  user: {
    wallets: {
      wallets: { list },
    },
  },
}: RootState): Wallet[] => list.map(createWallet);

export const selectWallet =
  (currencyCode?: string) =>
  (state: RootState): Wallet | undefined => {
    if (!currencyCode) {
      return;
    }

    const wallets = selectWallets(state);
    if (!Array.isArray(wallets)) {
      return;
    }

    const wallet = wallets.find((item) => item.currency.code === currencyCode);
    if (!wallet) {
      return;
    }

    return wallet;
  };

export const selectWalletsLoading = (state: RootState): boolean =>
  state.user.wallets.wallets.loading;

export const selectWithdrawSuccess = (state: RootState): boolean =>
  state.user.wallets.wallets.withdrawSuccess;

export const selectWalletsTimestamp = (state: RootState): number | undefined =>
  state.user.wallets.wallets.timestamp;

export const selectMobileWalletUi = (state: RootState): string =>
  state.user.wallets.wallets.mobileWalletChosen;

export const selectShouldFetchWallets = (state: RootState): boolean =>
  !selectWalletsTimestamp(state) && !selectWalletsLoading(state);
