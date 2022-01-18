import type { Currency } from '@bitzlato/money-js';

export function getCurrencySymbol(value: Currency): string {
  return value.code.split('-')[0]!;
}

export function getCurrencyCodeSymbol(value: string): string {
  return value.split('-')[0]!;
}
