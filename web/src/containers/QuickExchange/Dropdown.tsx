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

export const DropdownComponent = <T extends string | number = string>({
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
          {value ? itemRenderer?.(value) ?? value : placeholder}
          <ChevronIcon className="cr-dropdown__arrow" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {list.map((item) => (
            <Dropdown.Item key={item} onSelect={() => onSelect?.(item)}>
              {itemRenderer?.(item) ?? item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
