import cn from 'classnames';
import { ChangeEventHandler, ComponentProps, ElementType, ReactNode } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import * as s from './TextInputCustom.css';

type SprinklesKeys = keyof Sprinkles;

type InputProps<C extends ElementType = 'input'> = {
  as?: C | undefined;
  label?: string | undefined;
  isError?: boolean | undefined;
  icon?: ReactNode | undefined;
  inputMode?: JSX.IntrinsicElements['input']['inputMode'] | undefined;
  onChange?: ((value: string) => void) | undefined;
};

export type TextInputProps<C extends ElementType = 'input'> = InputProps<C> &
  Omit<ComponentProps<C>, keyof InputProps | SprinklesKeys>;

export const TextInput = ({
  as = 'input',
  type = 'text',
  label,
  placeholder = ' ',
  className,
  isError = false,
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
        placeholder={placeholder}
        {...inputProps}
        className={cn(s.input, className, isError && s.inputError)}
        onChange={handleChange}
      />
      <Box as="span" className={s.label}>
        {label}
      </Box>
    </Box>
  );
};

type TextAreaInputProps<C extends ElementType = 'textarea'> = InputProps<C> &
  Omit<ComponentProps<C>, keyof InputProps | SprinklesKeys>;

export const TextAreaInput = ({
  as = 'textarea',
  rows = 3,
  label,
  icon,
  className,
  isError = false,
  onChange,
  ...restProps
}: TextAreaInputProps) => {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onChange?.(event.target.value);
  };

  return (
    <Box as="label" className={s.inputContainer}>
      <Box
        as={as}
        rows={rows}
        placeholder=""
        className={cn(
          s.input,
          s.textAreaPlaceholder,
          className,
          icon && s.showIcon,
          isError && s.inputError,
        )}
        onChange={handleChange}
        {...restProps}
      />
      <Box as="span" className={s.label}>
        {label}
      </Box>
      <Box className={s.icon}>{icon}</Box>
    </Box>
  );
};
