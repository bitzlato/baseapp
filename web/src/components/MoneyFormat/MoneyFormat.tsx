import React, { FC, ReactElement } from 'react';

import { defaultFormatOptions, FormatOptions, Money } from '@trzmaxim/money';
import s from './MoneyFormat.postcss';

type Renderer = (amountFormatted: string) => ReactElement;

interface Props extends FormatOptions {
  money: Money;
  children?: Renderer;
}

export const MoneyFormat: FC<Props> = ({ money, children, ...options }: Props) => {
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
