import * as React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { FormControl, FormControlProps } from 'react-bootstrap';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import { Box } from 'src/components/Box/Box';
import s from './NumberInput.postcss';

export interface NumberInputProps extends Omit<FormControlProps, 'onChange'> {
  label?: React.ReactNode;
  onChange: (value: string) => void;
  inputClassName?: string;
  labelClassName?: string;
  labelVisible?: boolean;
  error?: React.ReactNode;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  onChange,
  className,
  inputClassName,
  labelClassName,
  labelVisible,
  error,
  ...props
}) => {
  const isMobileDevice = useSelector(selectMobileDeviceState);

  return (
    <div className={cn(s.numberInput, isMobileDevice && s.numberInputNoButtons, className)}>
      <Box ellipsis as="label">
        {(labelVisible || props.value) && label}
      </Box>
      <FormControl
        {...props}
        className={inputClassName as string}
        onChange={(e) => onChange(e.target.value)}
        type={(isMobileDevice ? 'number' : undefined) as string}
        placeholder={(!labelVisible ? label : undefined) as string}
      />
      {error && <p className={s.numberInputError}>{error}</p>}
    </div>
  );
};
