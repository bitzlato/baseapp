import { Currency } from '@bitzlato/money-js';

export interface BaseCurrency extends Currency {
  name: string;
  sign: string;
}
