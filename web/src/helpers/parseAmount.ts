import { parseNumeric } from './parseNumeric';

export const parseAmount = (amount: string, maxFractionDigits: number): string => {
  const numeric = parseNumeric(amount);
  const [integer, fractional] = numeric.split('.');
  if (typeof integer === 'string' && maxFractionDigits === 0) {
    return integer;
  }

  if (typeof fractional === 'string' && fractional.length > maxFractionDigits) {
    return `${integer}.${fractional.slice(0, maxFractionDigits)}`;
  }

  return numeric;
};
