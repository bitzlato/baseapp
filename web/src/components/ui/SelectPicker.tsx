import { ReactNode, useState } from 'react';
import ReactSelect from 'react-select';
import { Box } from 'web/src/components/ui/Box';

import * as s from './SelectPicker.css';

interface Props<T> {
  label: string;
  onChange: (v: T) => void;
  options: T[];
  itemLabel: (item: T) => string;
  itemRender: (item: T) => ReactNode;
  itemValue: (item: T) => string;
  value: T | null;
  valueRender: (item: T) => ReactNode;
}

// Render ReactSelect inside dropdown with search and custom value renderer
// refer API: https://react-select.com/props#select-props
export const SelectPicker = <T extends Object>({
  label,
  options,
  value, valueRender,
  onChange,
  itemLabel, itemRender, itemValue,
}: Props<T>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Box
      position="relative"
    >
      <div className={s.control}>
        {label}
        {value && valueRender(value)}
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>toggle</button>
      </div>
      {isDropdownOpen && <>
        <div className={s.dropdown}>
          <ReactSelect<T>
            autoFocus
            backspaceRemovesValue={false}
            blurInputOnSelect
            components={{
              DropdownIndicator: SearchIcon,
              IndicatorSeparator: null,
            }}
            controlShouldRenderValue={false}
            formatOptionLabel={itemRender}
            getOptionLabel={itemLabel}
            getOptionValue={itemValue}
            hideSelectedOptions={false}
            isClearable={false}
            isMulti={false}
            isSearchable
            minMenuHeight={330}
            maxMenuHeight={330}
            menuIsOpen
            noOptionsMessage={(v) => {
              return v.inputValue.length > 0 ? 'Ничего не найдено' : 'Нет элементов для выбора';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                // close on escape
                setIsDropdownOpen(false);
                e.stopPropagation();
                return false;
              }
              return true;
            }}
            onChange={(v) => {
              setIsDropdownOpen(false);
              onChange?.(v as T);
            }}
            options={options}
            placeholder="Поиск"
            styles={{
              //control: provided => ({ ...provided, minWidth: 240, margin: 8 }),
              //menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
            }}
            tabSelectsValue={false}
            value={value}
          />
        </div>
        {/*<div
          className={s.outerOverlay}
          onClick={() => setIsDropdownOpen(false)}
        />*/}
      </>}
    </Box>
  );
};

// internal component
const SearchIcon = () => (
  <div style={{ height: 24, width: 32 }}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
      role="presentation">
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  </div>
);
