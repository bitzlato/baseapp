import { Currency, Money } from '@bitzlato/money-js';
import { DEFAULT_CURRENCY } from 'src/modules/public/currencies/defaults';

export function createCcy(code: string, minorUnit: number): Currency {
  return { code, minorUnit };
}

export function createMoney(amount: number | string, currency: Currency): Money {
  try {
    return Money.fromDecimal(amount, currency, Money.ROUND_DOWN);
  } catch (err) {
    return Money.fromDecimal(0, currency, Money.ROUND_DOWN);
  }
}

export const ZERO_MONEY = createMoney(0, DEFAULT_CURRENCY);
