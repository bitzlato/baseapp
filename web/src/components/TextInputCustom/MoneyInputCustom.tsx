import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { CurrencyTicker } from 'web/src/components/CurrencyTicker/CurrencyTicker';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { TextInput, TextInputProps } from './TextInputCustom';
import * as s from './TextInputWithControl.css';

interface Props extends TextInputProps {
  currency: string;
  showIcon?: boolean;
}

export const MoneyInput: FC<Props> = ({ currency, showIcon, ...inputProps }) => {
  return (
    <Box position="relative">
      <TextInput className={s.input} labelClassName={s.input} {...inputProps} />
      <Box
        className={s.inputRightControls}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="8x"
        minWidth="14x"
        px="3x"
        mr="2x"
        borderRadius="1x"
        bg="selectButtonBg"
        color="selectButtonText"
        gap="1x"
      >
        {showIcon && <CryptoCurrencyIcon size="5x" currency={currency} />}
        <CurrencyTicker symbol={currency} />
      </Box>
    </Box>
  );
};
