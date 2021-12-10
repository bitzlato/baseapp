import { Currency, Money } from '@bitzlato/money-js';

export function createCcy(code: string, minorUnit: number): Currency {
  return { code, minorUnit };
}

export function createMoney(amount: number | string, currency: Currency): Money {
  try {
    return Money.fromDecimal(amount, currency);
  } catch (err) {
    return Money.fromDecimal(0, currency);
  }
}
