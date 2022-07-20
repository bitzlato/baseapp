import { FC } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { TextInput } from 'web/src/components/TextInputCustom/TextInputCustom';
import * as s from './InputStepper.css';

interface Props {
  value: number;
  isError?: boolean;
  onChange: (value: number) => void;
  onPlusClick: () => void;
  onMinusClick: () => void;
}

export const InputStepper: FC<Props> = ({
  value,
  isError = false,
  onChange,
  onPlusClick,
  onMinusClick,
}) => {
  return (
    <Box className={s.container}>
      <Box
        as="button"
        type="button"
        fontSize="medium"
        color="textMuted"
        fontWeight="medium"
        pl="3x"
        pr="2x"
        className={cn(s.stepButton, s.stepButtonMinus)}
        onClick={onMinusClick}
      >
        -
      </Box>

      <TextInput
        className={s.input}
        type="number"
        value={value}
        isError={isError}
        onChange={(v) => onChange(Number(v))}
      />

      <Box
        as="button"
        type="button"
        fontSize="medium"
        color="textMuted"
        fontWeight="medium"
        pr="3x"
        pl="2x"
        className={cn(s.stepButton, s.stepButtonPlus)}
        onClick={onPlusClick}
      >
        +
      </Box>
    </Box>
  );
};
