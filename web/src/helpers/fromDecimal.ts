import { Currency, Money } from '@bitzlato/money-js';

export function fromDecimalSilent(amount: number | string, currency: Currency): Money {
  try {
    return Money.fromDecimal(amount, currency);
  } catch (err) {
    return Money.fromDecimal(0, currency);
  }
}
