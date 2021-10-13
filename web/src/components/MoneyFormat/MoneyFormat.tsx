import React, { FC, ReactElement } from 'react';

import { defaultFormatterOptions, format, FormatterOptions } from './formatter';
import { Currency, Money } from './Money';
import s from './MoneyFormat.postcss';

type Renderer = (amountFormatted: string) => ReactElement;

interface Props extends FormatterOptions {
  money: Money;
  children?: Renderer;
}

export const MoneyFormat: FC<Props> = ({ money, children, ...options }: Props) => {
  const amountFormatted = format(money, options);

  if (children) {
    return children(amountFormatted);
  }

  const decimalSeparator = options.decimalSeparator ?? defaultFormatterOptions.decimalSeparator;
  const [integer, fractional] = amountFormatted.split(decimalSeparator);

  return (
    <>
      {integer}
      <span className={s.fractional}>
        {decimalSeparator}
        {fractional}
      </span>
    </>
  );
};

export const money = (amount: Money['amount'], currency: Money['currency']) => ({
  amount,
  currency,
});

export const ccy = (code: Currency['code'], minorUnit: Currency['minorUnit']) => ({
  code,
  minorUnit,
});
