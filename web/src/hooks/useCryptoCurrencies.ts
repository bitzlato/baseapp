import { MoneyCurrency } from 'web/src/types';

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

const cryptoCurrencies = Object.keys(MINOR_UNIT_MAP).reduce<Record<string, MoneyCurrency>>(
  (acc, code) => {
    acc[code] = { code, name: code, sign: code, minorUnit: MINOR_UNIT_MAP[code] ?? 8 };
    return acc;
  },
  {},
);

const getCryptoCurrency = (code: string): MoneyCurrency => {
  const maybeMoneyCurrency = cryptoCurrencies[code];

  return (
    maybeMoneyCurrency ?? { code, name: code, sign: code, minorUnit: MINOR_UNIT_MAP[code] ?? 8 }
  );
};

export const useCryptoCurrencies = (): {
  getCryptoCurrency: (code: string) => MoneyCurrency;
  cryptoCurrencies: Record<string, MoneyCurrency>;
} => ({ getCryptoCurrency, cryptoCurrencies });
