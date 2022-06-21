import cn from 'classnames';
import { ChangeEventHandler, ComponentProps, ElementType } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import * as s from './TextInputCustom.css';

type SprinklesKeys = keyof Sprinkles;

type InputProps<C extends ElementType = 'input'> = {
  as?: C | undefined;
  label?: string | undefined;
  inputMode?: JSX.IntrinsicElements['input']['inputMode'] | undefined;
  onChange?: ((value: string) => void) | undefined;
};

export type TextInputProps<C extends ElementType = 'input'> = InputProps<C> &
  Omit<ComponentProps<C>, keyof InputProps | SprinklesKeys>;

export const TextInput = ({
  as = 'input',
  type = 'text',
  label,
  className,
  onChange,
  ...inputProps
}: TextInputProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.target.value);
  };

  return (
    <Box as="label" className={s.inputContainer}>
      <Box
        as={as}
        type={type}
        {...inputProps}
        placeholder=" "
        className={cn(s.input, className)}
        onChange={handleChange}
      />
      <Box as="span" className={s.label}>
        {label}
      </Box>
    </Box>
  );
};
