import { useMemo } from 'react';
import { createMoney } from 'web/src/helpers/money';
import { useFetchP2PWalletsV2 } from 'web/src/hooks/data/p2p/useFetchP2PWalletsV2';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { P2PWallet } from 'web/src/modules/p2p/wallet-types';
import { P2PBalance } from 'web/src/types/balances.types';
import { P2PCryptoCurrency, P2PFiatCurrency } from 'web/src/types/currencies.types';

const createP2PBalance = (
  source: P2PWallet,
  cryptoCurrency: P2PCryptoCurrency,
  fiatCurrency: P2PFiatCurrency,
): P2PBalance => {
  return {
    ...source,
    cryptocurrency: cryptoCurrency,
    balance: createMoney(source.balance, cryptoCurrency),
    holdBalance: createMoney(source.holdBalance, cryptoCurrency),
    worth: {
      currency: fiatCurrency,
      value: createMoney(source.worth.value, fiatCurrency),
      holdValue: createMoney(source.worth.holdValue, fiatCurrency),
    },
  };
};

export const useP2PBalances = (fiatCurrencyCode: string): P2PBalance[] | undefined => {
  const { data: wallets } = useFetchP2PWalletsV2(fiatCurrencyCode);
  const { getCryptoCurrency } = useP2PCryptoCurrencies();
  const { getFiatCurrency } = useP2PFiatCurrencies();

  return useMemo(
    () =>
      wallets?.map((source) =>
        createP2PBalance(
          source,
          getCryptoCurrency(source.cryptocurrency),
          getFiatCurrency(source.worth.currency),
        ),
      ),
    [getCryptoCurrency, getFiatCurrency, wallets],
  );
};
