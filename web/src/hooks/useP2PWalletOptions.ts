import { Money } from '@bitzlato/money-js';
import { useMemo } from 'react';
import { useUser } from '../components/app/AppContext';
import { createMoney } from '../helpers/money';
import { MoneyCurrency } from '../types';
import { useFetchP2PCryptoCurrencies, useFetchP2PWalletsV2 } from './data/useFetchP2PWallets';
import { useCryptoCurrencies } from './useCryptoCurrencies';

export interface P2PWalletOption {
  code: string;
  name: string;
  balance?: Money | undefined;
  worth?: Money | undefined;
}

export function useP2PWalletOptions(
  cryptocurrency: string,
  getFiatCurrency: (code: string) => MoneyCurrency,
) {
  const user = useUser();
  const { getCryptoCurrency } = useCryptoCurrencies();

  const userCurrency = user?.bitzlato_user?.user_profile.currency;
  const { data: wallets = [] } = useFetchP2PWalletsV2(userCurrency);
  const { data: cryptoCurrencies = [] } = useFetchP2PCryptoCurrencies(); // TODO: merge with useCryptoCurrencies

  const walletOptions: P2PWalletOption[] = useMemo(() => {
    return cryptoCurrencies.map(({ code, name }) => {
      const maybeWallet = wallets.find((wallet) => wallet.cryptocurrency === code);
      return {
        code,
        name,
        balance: maybeWallet
          ? createMoney(maybeWallet.balance, getCryptoCurrency(maybeWallet.cryptocurrency))
          : undefined,
        worth: maybeWallet
          ? createMoney(maybeWallet.worth.value, getFiatCurrency(maybeWallet.worth.currency))
          : undefined,
      };
    });
  }, [cryptoCurrencies, wallets, getCryptoCurrency, getFiatCurrency]);

  const selectedWalletOption = useMemo(() => {
    return walletOptions.find((option) => option.code === cryptocurrency) ?? null;
  }, [cryptocurrency, walletOptions]);

  return { selectedWalletOption, walletOptions };
}
