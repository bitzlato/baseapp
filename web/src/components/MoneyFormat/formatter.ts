import BigNumber from 'bignumber.js';

import { Money } from './Money';

export interface FormatterOptions extends BigNumber.Format {
  minFractionDigits?: number; // default: 2
  maxFractionDigits?: number; // default: 20
  removeTrailingZeros?: boolean; // default: true
}

export const defaultFormatterOptions: Required<FormatterOptions> = {
  minFractionDigits: 2,
  maxFractionDigits: 20,
  removeTrailingZeros: true,
  // next options from BigNimber.toFormat
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
};

export const format = (money: Money, options?: FormatterOptions): string => {
  const formatterOptions = {
    ...defaultFormatterOptions,
    ...options,
  };
  const { amount } = money;

  let decimalPlaces = 0;
  if (money.currency.minorUnit > 0) {
    const [, fractional = ''] = amount.toString().split('.') as [string, string | undefined];
    const fractionalLength = formatterOptions.removeTrailingZeros
      ? fractional?.replace(/0+$/, '').length
      : money.currency.minorUnit; // remove trailing zeros
    decimalPlaces = Math.min(
      Math.max(fractionalLength, formatterOptions.minFractionDigits),
      Math.min(money.currency.minorUnit, formatterOptions.maxFractionDigits),
    );
  }

  return new BigNumber(amount).toFormat(decimalPlaces, BigNumber.ROUND_FLOOR, formatterOptions);
};

const getFormatterOptionsByLocale = (locale: string): FormatterOptions | undefined => {
  switch (locale) {
    case 'ru':
      return {
        decimalSeparator: ',',
        groupSeparator: ' ',
      };
    case 'en':
      return {
        decimalSeparator: '.',
        groupSeparator: ',',
      };
    default:
      return { groupSize: 0 };
  }
};

export const formatByLocale = (
  locale: string,
  money: Money,
  options?: FormatterOptions,
): string => {
  const defaultFormatterOptionsByLocale = getFormatterOptionsByLocale(locale);

  return format(money, {
    ...defaultFormatterOptionsByLocale,
    ...options,
  });
};
