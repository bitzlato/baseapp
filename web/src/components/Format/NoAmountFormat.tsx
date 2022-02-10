import { FC, ReactElement, ReactNode } from 'react';
import { Money } from '@bitzlato/money-js';
import { AmountFormat, AmountFormatProps } from 'web/src/components/AmountFormat/AmountFormat';

interface Props extends Omit<AmountFormatProps, 'money'> {
  money: Money | undefined;
}

export const NoAmountFormat: FC<Props> = ({ money, ...rest }) => {
  if (money === undefined) {
    return '–' as ReactNode & ReactElement; // en dash
  }

  return <AmountFormat {...rest} money={money} />;
};
