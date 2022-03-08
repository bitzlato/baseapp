import { forwardRef } from 'react';
import * as s from './Switch.css';

interface Props {
  disabled?: boolean | undefined;
  checked: boolean;
  id?: string | undefined;
  onChange?: () => void;
}

export const Switch = forwardRef<HTMLInputElement, Props>(
  ({ disabled = false, checked, id, onChange }, ref) => {
    return (
      <label htmlFor={id} className={s.switcher[disabled ? 'disabled' : 'base']}>
        <input
          ref={ref}
          className={s.input}
          id={id}
          type="checkbox"
          role="switch"
          value={checked ? 1 : 0}
          disabled={disabled}
          onChange={onChange}
        />
        <span className={s.track[checked ? 'checked' : 'base']}>
          <span className={s.thumb[checked ? 'checked' : 'base']} />
        </span>
      </label>
    );
  },
);

Switch.displayName = 'Switch';
