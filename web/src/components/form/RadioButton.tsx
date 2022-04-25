import { FC, ReactNode } from 'react';
import * as s from './RadioButton.css';

export interface RadioButtonOption {
  value: string;
  label: string;
  disabled?: boolean;
  text?: ReactNode;
}

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  options: Array<RadioButtonOption>;
}

export const RadioButton: FC<Props> = ({
  value, onChange, options,
}) => {
  const handleChange = (option: RadioButtonOption) => {
    onChange(option.value);
  };

  const getClassName = (option: RadioButtonOption) => {
    if (option.disabled)
      return s.control.disabled;
    if (option.value === value)
      return s.control.checked;
    return s.control.base;
  };

  return (
    <div>
      {options.map((option) =>
        <button
          className={getClassName(option)}
          onClick={() => handleChange(option)}
        >
          {option.text || option.label}
        </button>,
      )}
    </div>
  );
};

