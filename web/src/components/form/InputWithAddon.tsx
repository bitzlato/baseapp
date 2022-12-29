import {
  FocusEventHandler,
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Box } from 'web/src/components/ui/Box';
import * as s from './InputWithAddon.css';
import { FieldContext } from './Field';
import { InputProps } from './Input';

export interface InputWithAddonProps extends InputProps {
  leftAddon?: ReactNode | undefined;
  rightAddon?: ReactNode | undefined;
}

export const InputWithAddon = memo(
  forwardRef<HTMLInputElement, InputWithAddonProps>(
    ({ leftAddon, rightAddon, onFocus, onBlur, ...props }, ref) => {
      const { isInvalid } = useContext(FieldContext);
      const [isFocused, setIsFocused] = useState(false);

      const handleFocus: FocusEventHandler<HTMLInputElement> = useCallback(
        (e) => {
          setIsFocused(true);

          onFocus?.(e);
        },
        [onFocus],
      );
      const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
        (e) => {
          setIsFocused(false);

          onBlur?.(e);
        },
        [onBlur],
      );

      return (
        <Box className={s.controlsWithAddon({ isInvalid, isFocused })}>
          {leftAddon}
          <Box
            as="input"
            className={s.input}
            aria-invalid={isInvalid ? 'true' : 'false'}
            {...props}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {rightAddon}
        </Box>
      );
    },
  ),
);

InputWithAddon.displayName = 'InputWithAddon';
