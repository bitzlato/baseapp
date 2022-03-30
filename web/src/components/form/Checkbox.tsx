import { ChangeEvent, FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import Trick from 'web/src/assets/svg/Trick.svg';
import * as s from './Checkbox.css';

interface Props {
  name?: string | undefined;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<Props> = ({ children, name, checked, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event);

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={s.checkbox}>
      <input
        className={s.input}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
      />
      <span className={s.control[checked ? 'checked' : 'base']} aria-hidden="true">
        {checked && <Trick />}
      </span>
      <Box as="span" ml="2x">
        {children}
      </Box>
    </label>
  );
};
