import * as React from 'react';
import { NumberInput, NumberInputProps } from 'src/components/NumberInput/NumberInput';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import s from './MoneyInput.postcss';

interface Props extends NumberInputProps {
  currency: string;
}

export const MoneyInput: React.FC<Props> = ({ currency, ...rest }) => {
  return (
    <div className={s.moneyInput}>
      <NumberInput className={s.moneyInput} {...rest} />
      <CurrencyTicker className={s.moneyInputCurrency} symbol={currency} />
    </div>
  );
};
