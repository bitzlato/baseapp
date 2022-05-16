import cn from 'classnames';
import { ReactNode, useState } from 'react';
import ReactSelect, { StylesConfig } from 'react-select';
import { Box } from 'web/src/components/ui/Box';
import { SearchIcon } from 'web/src/assets/icons/SearchIcon';
import { ChevronIcon } from '../../assets/images/ChevronIcon';

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

const SearchIconWrapper = () => <SearchIcon className={s.searchIcon} />;

// Render ReactSelect inside dropdown with search and custom value renderer
// refer API: https://react-select.com/props#select-props
export const SelectPicker = <T extends Object>({
  label,
  options,
  value,
  valueRender,
  onChange,
  itemLabel,
  itemRender,
  itemValue,
}: Props<T>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectStyles: StylesConfig<T> = {
    control: (base) => ({
      ...base,
      margin: 4,
      border: 'none',
      borderRadius: 'none',
      boxShadow: 'none',
    }),
    input: (base) => ({
      ...base,
      color: '#262D37',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#262D37',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor:
        state.isSelected || state.isFocused ? 'rgba(240, 243, 249, 1)' : 'transparent',
      color: 'inherit',
    }),
    menu: () => ({
      borderTop: '1px solid rgba(38, 45, 55, 0.15)',
      width: '100%',
    }),
    menuList: (base) => ({
      ...base,
      padding: '0 0 10px',
    }),
    noOptionsMessage: () => ({
      textAlign: 'center',
      marginTop: '25%',
    }),
  };

  return (
    <Box position="relative">
      <Box
        className={s.control}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className={s.label}>{(label || value) && label}</div>
        <div className={s.value}>{value && valueRender(value)}</div>
        <ChevronIcon className={cn(s.chevron, { [s.chevronRotated]: isDropdownOpen })} />
      </Box>
      {isDropdownOpen && (
        <>
          <div className={s.dropdown}>
            <ReactSelect<T>
              autoFocus
              backspaceRemovesValue={false}
              blurInputOnSelect
              components={{
                DropdownIndicator: SearchIconWrapper,
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
              minMenuHeight={230}
              maxMenuHeight={230}
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
              styles={selectStyles}
              tabSelectsValue={false}
              value={value}
            />
          </div>
          <div className={s.outerOverlay} onClick={() => setIsDropdownOpen(false)} />
        </>
      )}
    </Box>
  );
};
