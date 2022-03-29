import { ReactNode, FC, ComponentPropsWithRef } from 'react';
import cn from 'classnames';
import { FormControl } from 'react-bootstrap';
import { Box } from 'src/components/Box/Box';
import s from './TextInput.postcss';

export interface TextInputProps
  extends Omit<ComponentPropsWithRef<typeof FormControl>, 'onChange' | 'className'> {
  label?: ReactNode;
  placeholder?: string | undefined;
  onChange: (value: string) => void;
  inputClassName?: string;
  labelVisible?: boolean;
  error?: ReactNode;
  autoFocus?: boolean;
  className?: string | undefined;
  noResize?: boolean;
}

export const TextInput: FC<TextInputProps> = ({
  label,
  placeholder,
  onChange,
  className,
  inputClassName,
  labelVisible,
  error,
  noResize,
  ...rest
}) => {
  return (
    <div className={cn(s.textInput, noResize && s.textInputNoResize, className)}>
      <Box ellipsis as="label">
        {(labelVisible || rest.value) && label}
      </Box>
      <FormControl
        {...rest}
        type="text"
        className={inputClassName as string}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? (!labelVisible ? label?.toString() : undefined)}
      />
      {error && <p className={s.textInputError}>{error}</p>}
    </div>
  );
};
