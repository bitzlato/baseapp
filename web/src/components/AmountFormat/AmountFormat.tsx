import { FC, ReactElement } from 'react';
import { defaultFormatOptions, FormatOptions, Money } from '@bitzlato/money-js';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from 'web/src/modules';
import { getFormatOptionsByLanguage } from './getFormatOptionsByLanguage';
import s from './AmountFormat.postcss';

type Renderer = (amountFormatted: string) => ReactElement;

export interface AmountFormatProps extends FormatOptions {
  money: Money;
  children?: Renderer;
}

export const AmountFormat: FC<AmountFormatProps> = ({ money, children, ...options }) => {
  const language = useSelector(selectCurrentLanguage);
  const formatOptions = {
    ...getFormatOptionsByLanguage(language),
    ...options,
  };
  const amountFormatted = money.toFormat(formatOptions);

  if (children) {
    return children(amountFormatted);
  }

  const decimalSeparator = formatOptions.decimalSeparator ?? defaultFormatOptions.decimalSeparator;
  const [integer, fractional] = amountFormatted.split(decimalSeparator);

  return (
    <>
      {integer}
      {fractional && (
        <span className={s.fractional}>
          {decimalSeparator}
          {fractional}
        </span>
      )}
    </>
  );
};
