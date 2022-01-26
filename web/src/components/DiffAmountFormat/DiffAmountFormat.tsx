import React, { FC } from 'react';

import { FormatOptions, Money } from '@bitzlato/money-js';
import { getDiffValue } from 'src/helpers/getDiffValue';

interface Props extends FormatOptions {
  currentValue: Money;
  prevValue: Money;
}

export const DiffAmountFormat: FC<Props> = (props) => {
  const { currentValue, prevValue, ...options } = props;
  const higlightedValue = getDiffValue(currentValue.toFormat(options), prevValue.toFormat(options));

  return (
    <>
      <span className="cr-decimal__opacity">{higlightedValue[0]}</span>
      <span>{higlightedValue[1]}</span>
    </>
  )
};
