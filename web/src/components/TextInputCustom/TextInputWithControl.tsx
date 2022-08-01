import { FC, ReactNode, useRef } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { TextInput, TextInputProps } from './TextInputCustom';
import * as s from './TextInputWithControl.css';

interface Props extends TextInputProps {
  control: ReactNode;
  onControlClick?: () => void;
}

const RIGHT_CONTROLS_PADDING = 12;

export const TextInputWithControl: FC<Props> = ({ control, onControlClick, ...inputProps }) => {
  const rightControlsRef = useRef<HTMLDivElement>(null);

  return (
    <Box width="full" position="relative">
      <TextInput
        className={s.input}
        style={
          rightControlsRef.current
            ? { paddingRight: rightControlsRef.current.clientWidth + RIGHT_CONTROLS_PADDING }
            : undefined
        }
        {...inputProps}
      />
      <Box
        ref={rightControlsRef}
        as={onControlClick ? 'button' : 'div'}
        className={cn(s.inputRightControls, { [s.inputRightControlsButton]: onControlClick })}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minWidth="14x"
        height="9x"
        px="3x"
        mr="2x"
        borderRadius="1x"
        bg="textInputControl"
        overflow="hidden"
        onClick={onControlClick}
      >
        {control}
      </Box>
    </Box>
  );
};
