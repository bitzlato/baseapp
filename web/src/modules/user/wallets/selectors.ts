import { createCcy, createMoney } from 'src/helpers/money';
import { RootState } from '../../';
import { WalletSource, Wallet } from './types';

const createWallet = (walletSource: WalletSource): Wallet => {
  const currency = createCcy(walletSource.currency.toUpperCase(), walletSource.precision);

  return {
    ...walletSource,
    currency,
    balance: createMoney(walletSource.balance, currency),
    locked: createMoney(walletSource.locked, currency),
    withdraw_fee: createMoney(walletSource.withdraw_fee, currency),
    limit_24_hour: createMoney(walletSource.limit_24_hour, USD),
    limit_1_month: createMoney(walletSource.limit_1_month, USD),
    min_withdraw_amount: createMoney(walletSource.min_withdraw_amount, currency),
  };
};

const USD = createCcy('USD', 2);

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

    currencyCode = currencyCode.toUpperCase();
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
