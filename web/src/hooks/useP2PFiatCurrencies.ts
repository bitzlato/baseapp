import { useCallback, useMemo } from 'react';
import { useFetchP2PCurrencies } from 'web/src/hooks/data/p2p/useFetchP2PCurrencies';
import { P2PFiatCurrency, P2PFiatCurrencies } from 'web/src/types/currencies.types';

const DEFAULT_FIAT_MINOR_UNIT = 2;

export const useP2PFiatCurrencies = (): {
  getFiatCurrency: (code: string) => P2PFiatCurrency;
  fiatCurrencies?: P2PFiatCurrencies | undefined;
} => {
  const { data } = useFetchP2PCurrencies();

  const fiatCurrencies = useMemo(
    () =>
      data &&
      data.reduce<P2PFiatCurrencies>((acc, item) => {
        acc[item.code] = {
          code: item.code,
          name: item.name,
          sign: item.sign,
          minorUnit: DEFAULT_FIAT_MINOR_UNIT,
        };

        return acc;
      }, {}),
    [data],
  );
  const getFiatCurrency = useCallback(
    (code: string): P2PFiatCurrency =>
      fiatCurrencies?.[code] ?? {
        code,
        name: code,
        sign: code,
        minorUnit: DEFAULT_FIAT_MINOR_UNIT,
      },
    [fiatCurrencies],
  );

  return { getFiatCurrency, fiatCurrencies };
};
