import { createContext, FC, useContext, useMemo } from 'react';
import { Box } from 'web/src/components/ui/Box';
import * as s from './WalletRadio.css';

interface WalletRadioContextType {
  name?: string | undefined;
  value?: string | undefined;
  onChange: (value: string | undefined) => void;
}

const WalletRadioContext = createContext<WalletRadioContextType>({
  onChange: () => {},
});

interface WalletRadioGroupProps {
  name?: string | undefined;
  value?: string | undefined;
  onChange: (nextValue: string | undefined) => void;
}

export const WalletRadioGroup: FC<WalletRadioGroupProps> = ({
  children,
  name,
  value,
  onChange,
}) => {
  const providerValue = useMemo(
    () => ({
      name,
      value,
      onChange,
    }),
    [name, value, onChange],
  );

  return (
    <WalletRadioContext.Provider value={providerValue}>{children}</WalletRadioContext.Provider>
  );
};

interface Props {
  label: string;
  size?: 'medium' | 'large';
  value: string;
  disabled?: boolean | undefined;
}

export const WalletRadio: FC<Props> = ({ children, label, size = 'medium', value, disabled }) => {
  const { name, value: currentValue, onChange } = useContext(WalletRadioContext);
  const checked = value === currentValue;
  const handleChange = () => {
    onChange(value);
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={s.radio}>
      <input
        className={s.input}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className={s.item({ size, checked, disabled })}>
        <Box as="span" display="flex" alignItems="center" gap="2x">
          <span className={s.control[checked ? 'checked' : 'base']} aria-hidden="true" />
          <Box as="span" fontSize="medium">
            {label}
          </Box>
        </Box>
        <span className={s.children[size]}>{children}</span>
      </span>
    </label>
  );
};
