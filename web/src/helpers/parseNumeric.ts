/**
 * https://github.com/bitzlato/p2p-mobile/blob/develop/src/utils/parse/parseNumeric.ts
 */

const NOT_NUMBERS_REGEXP = /[^\d.]/g;

type Options = {
  allowNegativeNumeric: boolean;
  onlyInteger: boolean;
  trimRightDot: boolean;
};

const defaultOptions: Options = {
  allowNegativeNumeric: false,
  onlyInteger: false,
  trimRightDot: false,
};

const parsePositiveNumeric = (value: string, onlyInteger: boolean = false): string => {
  const numeric = value.replace(/,/g, '.').replace(NOT_NUMBERS_REGEXP, '');
  if (numeric === '') {
    return '';
  }

  if (onlyInteger) {
    const arr = numeric.split('.') as [string, ...string[]];
    return arr.length > 1 ? arr.slice(0, -1).join('') : arr[0];
  }

  if (numeric === '.') {
    return '0.';
  }

  let [integer, ...other] = numeric.split('.');
  let fractional = other[0];
  if (other.length > 1) {
    fractional = other[other.length - 1];
    integer = `${integer}${other.slice(0, -1).join('')}`;
  }

  return `${integer === '' ? '0' : integer}${
    typeof fractional === 'string' ? `.${fractional}` : ''
  }`;
};

export const parseNumeric = (value: string, options: Partial<Options> = {}): string => {
  const { allowNegativeNumeric, onlyInteger, trimRightDot } = { ...defaultOptions, ...options };

  if (value === '') {
    return '';
  }

  if (value === '-' && allowNegativeNumeric) {
    return '-';
  }

  let isNegative = false;
  if (value[0] === '-' && allowNegativeNumeric) {
    isNegative = true;
  }

  const positiveNumber = parsePositiveNumeric(value, onlyInteger);

  return `${isNegative ? '-' : ''}${
    trimRightDot && positiveNumber[positiveNumber.length - 1] === '.'
      ? positiveNumber.slice(0, -1)
      : positiveNumber
  }`;
};

export const parseInteger = (value: string, allowNegativeNumeric: boolean = false) => {
  return parseNumeric(value, { allowNegativeNumeric, onlyInteger: true });
};
