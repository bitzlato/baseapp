import { ReactNode, FC, ComponentPropsWithRef } from 'react';
import cn from 'classnames';
import { FormControl } from 'react-bootstrap';
import { Box } from 'src/components/Box/Box';
import { capitalize } from 'web/src/helpers/capitalize';
import s from './TextInput.postcss';

export interface TextInputProps
  extends Omit<ComponentPropsWithRef<typeof FormControl>, 'onChange' | 'className'> {
  label?: ReactNode;
  placeholder?: string | undefined;
  onChange: (value: string) => void;
  onPressEnterKey?: () => void | undefined;
  inputClassName?: string;
  labelVisible?: boolean | undefined;
  error?: ReactNode;
  autoFocus?: boolean | undefined;
  className?: string | undefined;
  noResize?: boolean;
  color?: 'failed' | undefined;
}

export const TextInput: FC<TextInputProps> = ({
  label,
  placeholder,
  onChange,
  onPressEnterKey,
  className,
  inputClassName,
  labelVisible,
  error,
  noResize,
  color,
  ...rest
}) => {
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnterKey?.();
    }
  };

  return (
    <div className={cn(s.textInput, noResize && s.textInputNoResize, className)}>
      <Box ellipsis as="label">
        {(labelVisible || rest.value) && label}
      </Box>
      <FormControl
        type="text"
        {...rest}
        className={cn(color && s[`inputColor${capitalize(color)}`], inputClassName as string)}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={placeholder ?? (!labelVisible ? label?.toString() : undefined)}
      />
      {error && <p className={s.textInputError}>{error}</p>}
    </div>
  );
};
