import React, { FC, ReactElement } from 'react';

import { defaultFormatOptions, FormatOptions, Money } from '@bitzlato/money-js';
import s from './AmountFormat.postcss';

type Renderer = (amountFormatted: string) => ReactElement;

interface Props extends FormatOptions {
  money: Money;
  children?: Renderer;
}

export const AmountFormat: FC<Props> = ({ money, children, ...options }: Props) => {
  const amountFormatted = money.toFormat(options);

  if (children) {
    return children(amountFormatted);
  }

  const decimalSeparator = options.decimalSeparator ?? defaultFormatOptions.decimalSeparator;
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
