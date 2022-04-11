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
