import cn from 'classnames';
import { ChangeEventHandler, ComponentProps, ElementType, ReactNode } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import * as s from './TextInputCustom.css';
import { InputContainerSizes } from './TextInputCustom.css';

type SprinklesKeys = keyof Sprinkles;

type InputProps<C extends ElementType = 'input'> = {
  as?: C | undefined;
  label?: string | undefined;
  isError?: boolean | undefined;
  icon?: ReactNode | undefined;
  inputMode?: JSX.IntrinsicElements['input']['inputMode'] | undefined;
  containerClassName?: string;
  size?: InputContainerSizes;
  labelClassName?: string;
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
  containerClassName,
  labelClassName,
  size = 'medium',
  isError = false,
  onChange,
  ...inputProps
}: TextInputProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.target.value);
  };

  return (
    <Box as="label" className={cn(s.inputContainer[size], containerClassName)}>
      <Box
        as={as}
        type={type}
        placeholder={placeholder}
        {...inputProps}
        className={cn(
          s.input[size],
          label && s.inputWithLabel[size],
          isError && s.inputError,
          className,
        )}
        onChange={handleChange}
      />
      <Box as="span" className={cn(s.label, labelClassName)}>
        {label}
      </Box>
    </Box>
  );
};

type TextAreaInputProps<C extends ElementType = 'textarea'> = InputProps<C> &
  Omit<ComponentProps<C>, keyof InputProps | SprinklesKeys> & { resize?: 'none' | undefined };

export const TextAreaInput = ({
  as = 'textarea',
  rows = 3,
  label,
  icon,
  className,
  labelClassName,
  placeholder = ' ',
  size = 'medium',
  isError = false,
  resize,
  onChange,
  ...restProps
}: TextAreaInputProps) => {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onChange?.(event.target.value);
  };

  return (
    <Box as="label" className={s.inputContainer[size]}>
      <Box
        as={as}
        rows={rows}
        placeholder={placeholder}
        className={cn(
          s.input[size],
          s.textAreaInput,
          resize === 'none' && s.inputTextareaNonResizable,
          placeholder && s.inputWithLabel[size],
          icon && s.showIcon,
          isError && s.inputError,
          className,
        )}
        onChange={handleChange}
        {...restProps}
      />
      <Box as="span" className={cn(s.label, labelClassName)}>
        {label}
      </Box>
      <Box className={s.icon}>{icon}</Box>
    </Box>
  );
};
