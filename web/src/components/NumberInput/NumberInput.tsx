import * as React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { FormControl, FormControlProps } from 'react-bootstrap';
import { parseNumeric } from 'src/helpers/parseNumeric';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import s from './NumberInput.postcss';

interface Props extends Omit<FormControlProps, 'onChange'> {
  label?: React.ReactNode;
  onChange: (value: string) => void;
  labelClassName?: string;
  labelVisible?: boolean;
}

export const NumberInput: React.FC<Props> = ({
  label,
  onChange,
  labelClassName,
  labelVisible,
  ...props
}) => {
  const isMobileDevice = useSelector(selectMobileDeviceState);

  return (
    <div className={cn(s.numberInput, isMobileDevice && s.numberInputNoButtons, props.className)}>
      <label className={labelClassName}>{(labelVisible || props.value) && label}</label>
      <FormControl
        {...props}
        onChange={(e) => onChange(parseNumeric(e.target.value))}
        type={isMobileDevice ? 'number' : undefined}
      />
    </div>
  );
};
