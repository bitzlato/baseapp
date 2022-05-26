import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { CurrencyTicker } from '../CurrencyTicker/CurrencyTicker';
import { TextInput, TextInputProps } from './TextInputCustom';
import * as s from './TextInputWithControl.css';

interface Props extends TextInputProps {
  currency: string;
}

export const MoneyInput: FC<Props> = ({ currency, ...inputProps }) => {
  return (
    <Box position="relative">
      <TextInput className={s.input} {...inputProps} />
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
      >
        <CurrencyTicker symbol={currency} />
      </Box>
    </Box>
  );
};
