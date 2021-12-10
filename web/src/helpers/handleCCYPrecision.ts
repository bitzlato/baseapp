import { ApiCurrency } from '../modules';

export const handleCCYPrecision = (
  currencies: ApiCurrency[],
  currency: string,
  defaultPrecision: number,
): number => {
  const precisableCCY =
    currencies[0] &&
    currency.length &&
    currencies.find((item) => item.id.toLowerCase() === currency.toLowerCase());

  return (precisableCCY && precisableCCY.precision) || defaultPrecision;
};
