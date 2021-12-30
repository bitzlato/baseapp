import React from 'react';
import cn from 'classnames';
import { Dropdown } from 'react-bootstrap';
import { ChevronIcon } from 'src/assets/images/ChevronIcon';

interface DropdownComponentProps<T> {
  className?: string;
  list: T[];
  onSelect?: (item: T) => void;
  placeholder?: string;
  value?: T;
  itemRenderer?: (item: T) => React.ReactNode;
}

export const DropdownComponent = <T extends Object>({
  list,
  className,
  placeholder,
  onSelect,
  itemRenderer,
  value,
}: DropdownComponentProps<T>) => {
  return (
    <div className={cn(className, 'cr-dropdown')}>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {value ? itemRenderer?.(value) ?? value.toString() : placeholder}
          <ChevronIcon className="cr-dropdown__arrow" />
        </Dropdown.Toggle>
        <Dropdown.Menu popperConfig={{ strategy: 'fixed' }}>
          {list.map((item, i) => (
            <Dropdown.Item key={i} onSelect={() => onSelect?.(item)}>
              {itemRenderer?.(item) ?? item.toString()}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
