import { FormatOptions } from '@bitzlato/money-js';
import { Language } from 'web/src/types';

export const getFormatOptionsByLanguage = (language: Language): FormatOptions => {
  switch (language) {
    case 'ru':
      return {
        groupSeparator: '\u00A0',
        decimalSeparator: ',',
      };

    default:
      return {
        groupSeparator: ',',
        decimalSeparator: '.',
      };
  }
};

const CRYPTO_CURRENCY_CODES_WITH_CENTS = new Set(['MCR', 'USDT', 'USDC', 'DOGE', 'DAI', 'MDT']);

export const getP2PFiatOptionsByCode = (code: string): FormatOptions => {
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
