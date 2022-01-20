import React from 'react';
import cn from 'classnames';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';
import { Box } from 'src/components/Box/Box';
import s from './Select.postcss';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> extends ReactSelectProps<SelectOption<T>, false> {
  value?: SelectOption<T>;
  placeholderAsLabel?: boolean;
  itemRenderer?: (item: SelectOption<T>) => React.ReactNode;
  size?: 'small';
}

export const Select = <T extends string>({
  placeholderAsLabel,
  itemRenderer,
  className,
  size,
  ...props
}: SelectProps<T>) => {
  return (
    <Box className={className} position="relative">
      {placeholderAsLabel && props.value?.value ? (
        <Box className={s.reactSelectLabel} ellipsis as="label">
          {props.placeholder}
        </Box>
      ) : null}
      <ReactSelect
        {...props}
        className={cn(s.reactSelect, size === 'small' && s.reactSelectSmall)}
        classNamePrefix={s.reactSelect}
        formatOptionLabel={itemRenderer}
        getOptionValue={toValue}
      />
    </Box>
  );
};

interface SelectStringProps<T extends string>
  extends Omit<SelectProps<T>, 'value' | 'onChange' | 'options' | 'itemRenderer' | 'defaultValue'> {
  options: T[];
  value?: T;
  defaultValue?: T;
  onChange: (value: T | null) => void;
  itemRenderer?: (value: T) => React.ReactNode;
}

export const SelectString = <T extends string>({
  options,
  placeholderAsLabel,
  onChange,
  itemRenderer,
  value,
  defaultValue,
  ...props
}: SelectStringProps<T>) => {
  return (
    <Select
      {...props}
      options={options.map(toOption)}
      value={value ? toOption(value) : undefined}
      defaultValue={defaultValue ? toOption(defaultValue) : undefined}
      onChange={(d: SelectOption<T> | null) => onChange(d ? toValue(d) : null)}
      placeholderAsLabel={placeholderAsLabel}
      itemRenderer={itemRenderer ? (d) => itemRenderer(toValue(d)) : undefined}
    />
  );
};

export function toOption<T extends string>(value: T): SelectOption<T> {
  return { value, label: value };
}

export function toValue<T extends string>(option: SelectOption<T>): T {
  return option.value;
}
