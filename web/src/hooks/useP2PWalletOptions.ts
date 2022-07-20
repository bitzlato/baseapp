import { Money } from '@bitzlato/money-js';
import { useMemo } from 'react';
import { useUser } from 'web/src/components/app/AppContext';
import { createMoney } from 'web/src/helpers/money';
import { useFetchP2PCryptoCurrencies } from 'web/src/hooks/data/p2p/useFetchP2PCryptoCurrencies';
import { useFetchP2PWalletsV2 } from 'web/src/hooks/data/p2p/useFetchP2PWalletsV2';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { BaseCurrency } from 'web/src/types/currencies.types';

export interface P2PWalletOption {
  code: string;
  name: string;
  balance?: Money | undefined;
  worth?: Money | undefined;
}

export function useP2PWalletOptions(
  getFiatCurrency: (code: string) => BaseCurrency,
  cryptocurrency?: string | undefined,
) {
  const user = useUser();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();

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
