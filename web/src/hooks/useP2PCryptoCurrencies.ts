import { useCallback, useMemo } from 'react';
import { createCcy, createMoney } from 'web/src/helpers/money';
import { useFetchP2PCryptoCurrencies } from 'web/src/hooks/data/p2p/useFetchP2PCryptoCurrencies';
import { P2PCryptoCurrency, P2PCryptoCurrencies } from 'web/src/types/currencies.types';
import { P2PCryptoCurrencySource } from 'web/src/modules/p2p/wallet-types';

const MINOR_UNIT_MAP: Record<string, number> = {
  BTC: 8,
  ETH: 8,
  BCH: 8,
  LTC: 8,
  DASH: 8,
  DOGE: 8,
  USDT: 6,
  USDC: 6,
  DAI: 8,
  MCR: 8,
  MDT: 8,
};

const getMinorUnit = (code: string): number => MINOR_UNIT_MAP[code] ?? 8;

const createP2PCryptoCurrency = (source: P2PCryptoCurrencySource): P2PCryptoCurrency => {
  const moneyCurrency = createCcy(source.code, getMinorUnit(source.code));

  return {
    ...moneyCurrency,
    name: source.name,
    sign: moneyCurrency.code,
    apiCurrency: {
      ...source,
      minWithdrawal: createMoney(source.minWithdrawal, moneyCurrency),
      minAcceptableDeposit: createMoney(source.minAcceptableDeposit, moneyCurrency),
    },
  };
};

export const useP2PCryptoCurrencies = (): {
  getCryptoCurrency: (code: string) => P2PCryptoCurrency;
  cryptoCurrencies?: P2PCryptoCurrencies | undefined;
} => {
  const { data } = useFetchP2PCryptoCurrencies();

  const cryptoCurrencies = useMemo(
    () =>
      data &&
      data.reduce<P2PCryptoCurrencies>((acc, item) => {
        acc[item.code] = createP2PCryptoCurrency(item);

        return acc;
      }, {}),
    [data],
  );
  const getCryptoCurrency = useCallback(
    (code: string): P2PCryptoCurrency =>
      cryptoCurrencies?.[code] ?? {
        code,
        name: code,
        sign: code,
        minorUnit: getMinorUnit(code),
      },
    [cryptoCurrencies],
  );

  return { getCryptoCurrency, cryptoCurrencies };
};
