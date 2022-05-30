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
  balance: Money;
  worth: Money;
}

export function useP2PWalletOptions(
  cryptocurrency: string,
  getFiatCurrency: (code: string) => MoneyCurrency,
) {
  const user = useUser();
  const { getCryptoCurrency } = useCryptoCurrencies();

  const userCurrency = user?.bitzlato_user?.user_profile.currency;
  const { data: wallets = [] } = useFetchP2PWalletsV2(userCurrency);

  const { data: cryptos = [] } = useFetchP2PCryptoCurrencies();

  const cryptoCurrencies: P2PWalletOption[] = useMemo(() => {
    return wallets.map((w) => {
      const name = cryptos.find((c) => c.code === w.cryptocurrency)?.name ?? w.cryptocurrency;
      return {
        code: w.cryptocurrency,
        name,
        balance: createMoney(w.balance, getCryptoCurrency(w.cryptocurrency)),
        worth: createMoney(w.worth.value, getFiatCurrency(w.worth.currency)),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets.length, cryptos.length]);

  const selectedCryptoCurrency = useMemo(() => {
    return cryptoCurrencies.find((d) => d.code === cryptocurrency) ?? null;
  }, [cryptoCurrencies, cryptocurrency]);

  return { selectedCryptoCurrency, cryptoCurrencies };
}
