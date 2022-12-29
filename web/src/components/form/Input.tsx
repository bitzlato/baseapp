import { forwardRef, memo, useContext } from 'react';
import { Box, BoxProps } from 'web/src/components/ui/Box';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import * as s from './Input.css';
import { FieldContext } from './Field';

type RegisterReturnType = ReturnType<UseFormRegister<FieldValues>>;
export interface InputProps
  extends Omit<BoxProps<'input'>, keyof RegisterReturnType>,
    RegisterReturnType {}
export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { isInvalid } = useContext(FieldContext);

    return (
      <Box
        as="input"
        type="text"
        className={s.input({ isInvalid })}
        aria-invalid={isInvalid ? 'true' : 'false'}
        {...props}
        ref={ref}
      />
    );
  }),
);
Input.displayName = 'Input';
