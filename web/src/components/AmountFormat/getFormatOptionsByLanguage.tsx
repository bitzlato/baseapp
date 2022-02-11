import { FormatOptions } from '@bitzlato/money-js';
import { Language } from 'web/src/types';

export const getFormatOptionsByLanguage = (language: Language): FormatOptions => {
  switch (language) {
    case 'ru':
      return {
        groupSeparator: ' ',
        decimalSeparator: ',',
      };

    default:
      return {
        groupSeparator: ',',
        decimalSeparator: '.',
      };
  }
};
