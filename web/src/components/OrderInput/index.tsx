import * as React from 'react';
import cn from 'classnames';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { CustomInput } from '../../components';

export interface OrderInputProps {
  className?: string;
  currency: string;
  label?: string;
  placeholder?: string;
  value: string | number;
  handleChangeValue: (text: string) => void;
  handleFocusInput?: () => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const OrderInput: React.FunctionComponent<OrderInputProps> = React.memo(
  ({
    currency,
    className,
    label,
    placeholder,
    value,
    handleChangeValue,
    onKeyPress,
    handleFocusInput,
  }) => {
    return (
      <div className={cn('cr-order-input', className)}>
        <CustomInput
          type="number"
          inputValue={value}
          placeholder={placeholder || '0'}
          handleChangeInput={handleChangeValue}
          label={value && label ? label : ''}
          defaultLabel={value && label ? label : ''}
          onKeyPress={onKeyPress}
          handleFocusInput={handleFocusInput}
        />
        <CurrencyTicker className="cr-order-input__currency" symbol={currency} />
      </div>
    );
  },
);
