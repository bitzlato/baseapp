import { parseNumeric, Options as ParseNumericOptions } from './parseNumeric';

interface ParseAmountOptions extends Partial<ParseNumericOptions> {
  maxFractionDigits: number;
}

export const parseAmount = (amount: string, options: ParseAmountOptions): string => {
  const { maxFractionDigits, ...parseNumericOptions } = options;
  const numeric = parseNumeric(amount, parseNumericOptions);
  const [integer, fractional] = numeric.split('.');
  if (typeof integer === 'string' && maxFractionDigits === 0) {
    return integer;
  }

  if (typeof fractional === 'string' && fractional.length > maxFractionDigits) {
    return `${integer}.${fractional.slice(0, maxFractionDigits)}`;
  }

  return numeric;
};
