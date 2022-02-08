import { FC } from 'react';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { Box } from 'src/components/Box/Box';
import { TextInputProps } from './TextInput';
import s from './MoneyInput.postcss';

interface Props extends TextInputProps {
  currency: string;
}

export const MoneyInput: FC<Props> = ({ currency, className, ...rest }) => {
  return (
    <Box position="relative" className={className}>
      <NumberInput className={s.moneyInputNumber} {...rest} />
      <CurrencyTicker className={s.moneyInputCurrency} symbol={currency} />
    </Box>
  );
};
