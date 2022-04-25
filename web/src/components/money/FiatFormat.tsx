import { Currency, FormatOptions } from '@bitzlato/money-js';
import { FC } from 'react';
import { AmountFormat, AmountFormatProps } from 'web/src/components/AmountFormat/AmountFormat';

const CRYPTO_CURRENCY_CODES_WITH_CENTS = new Set(['MCR', 'USDT', 'USDC', 'DOGE', 'DAI', 'MDT']);

const getOptionsByCode = (code: string): FormatOptions => {
  return CRYPTO_CURRENCY_CODES_WITH_CENTS.has(code)
    ? {
        minFractionDigits: 0,
        maxFractionDigits: 2,
      }
    : {
        minFractionDigits: 0,
        maxFractionDigits: 0,
      };
};

export interface Props extends AmountFormatProps {
  cryptoCurrency: Currency;
}

export const FiatFormat: FC<Props> = ({ cryptoCurrency, ...props }) => (
  <AmountFormat {...props} {...getOptionsByCode(cryptoCurrency.code)} />
);
