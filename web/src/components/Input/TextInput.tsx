import { ReactNode, FC } from 'react';
import cn from 'classnames';
import { FormControl, FormControlProps } from 'react-bootstrap';
import { Box } from 'src/components/Box/Box';
import s from './TextInput.postcss';

export interface TextInputProps extends Omit<FormControlProps, 'onChange' | 'className'> {
  label?: ReactNode;
  onChange: (value: string) => void;
  inputClassName?: string;
  labelVisible?: boolean;
  error?: ReactNode;
  autoFocus?: boolean;
  className?: string | undefined;
}

export const TextInput: FC<TextInputProps> = ({
  label,
  onChange,
  className,
  inputClassName,
  labelVisible,
  error,
  ...rest
}) => {
  return (
    <div className={cn(s.textInput, className)}>
      <Box ellipsis as="label">
        {(labelVisible || rest.value) && label}
      </Box>
      <FormControl
        {...rest}
        type="text"
        className={inputClassName as string}
        onChange={(e) => onChange(e.target.value)}
        placeholder={!labelVisible ? label : undefined}
      />
      {error && <p className={s.textInputError}>{error}</p>}
    </div>
  );
};
