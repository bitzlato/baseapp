import React from 'react';
import cn from 'classnames';
import { Dropdown } from 'react-bootstrap';
import { ChevronIcon } from 'src/assets/images/ChevronIcon';
import { Box } from 'src/components/Box/Box';

interface DropdownComponentProps<T> {
  className?: string;
  list: T[];
  onSelect?: (item: T) => void;
  placeholder?: string;
  placeholderAsLabel?: boolean;
  value?: T;
  itemRenderer?: (item: T) => React.ReactNode;
}

export const Dropdown2 = <T extends Object>({
  list,
  className,
  placeholder,
  placeholderAsLabel,
  onSelect,
  itemRenderer,
  value,
}: DropdownComponentProps<T>) => {
  return (
    <div className={cn(className, 'cr-dropdown')}>
      {placeholderAsLabel && value && (
        <Box className="cr-dropdown__label" ellipsis as="label">
          {placeholder}
        </Box>
      )}
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          <Box grow row spacing justify="between">
            {value ? (
              itemRenderer?.(value) ?? value.toString()
            ) : (
              <span className="cr-dropdown__placeholder">{placeholder}</span>
            )}
            <ChevronIcon className="cr-dropdown__arrow" />
          </Box>
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
