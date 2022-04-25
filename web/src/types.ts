import { Currency } from '@bitzlato/money-js';
import { WrappedComponentProps } from 'react-intl';

export type IntlProps = WrappedComponentProps;

export type Language = 'ru' | 'en';
export type Theme = 'light' | 'dark';

export type OptionalWithUndefined<T> = {
  [P in keyof T]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : T[P] | undefined;
};

export interface MoneyCurrency extends Currency {
  name: string;
  sign: string;
}
