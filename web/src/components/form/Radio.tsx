import { createContext, FC, useContext, useMemo } from 'react';
import { Box } from 'web/src/components/ui/Box';
import * as s from './Radio.css';

interface RadioContextType {
  name?: string | undefined;
  value?: string | undefined;
  onChange: (value: string | undefined) => void;
}

const RadioContext = createContext<RadioContextType>({
  onChange: () => {},
});

interface RadioGroupProps {
  name?: string | undefined;
  value?: string | undefined;
  onChange: (nextValue: string | undefined) => void;
}

export const RadioGroup: FC<RadioGroupProps> = ({ children, name, value, onChange }) => {
  const providerValue = useMemo(
    () => ({
      name,
      value,
      onChange,
    }),
    [name, value, onChange],
  );

  return <RadioContext.Provider value={providerValue}>{children}</RadioContext.Provider>;
};

interface Props {
  value: string;
}

export const Radio: FC<Props> = ({ children, value }) => {
  const { name, value: currentValue, onChange } = useContext(RadioContext);
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
        onChange={handleChange}
      />
      <span className={s.control[checked ? 'checked' : 'base']} aria-hidden="true" />
      <Box as="span" ml="2x">
        {children}
      </Box>
    </label>
  );
};
