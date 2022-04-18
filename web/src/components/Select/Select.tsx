import { ReactNode } from 'react';
import cn from 'classnames';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';
import { Box } from 'src/components/Box/Box';
import s from './Select.postcss';

interface SelectProps<T> extends ReactSelectProps<T, false> {
  label?: string;
  size?: 'small';
}

export const Select = <T extends Object>({ label, className, size, ...rest }: SelectProps<T>) => {
  return (
    <Box className={className} position="relative">
      {rest.value ? (
        <Box className={s.reactSelectLabel} ellipsis as="label">
          {label || rest.placeholder}
        </Box>
      ) : null}
      <ReactSelect
        {...rest}
        className={cn(s.reactSelect, size === 'small' && s.reactSelectSmall)}
        classNamePrefix={s.reactSelect}
      />
    </Box>
  );
};

interface SelectStringProps<T extends string | number, U>
  extends Omit<
    SelectProps<U>,
    'value' | 'onChange' | 'options' | 'itemRenderer' | 'defaultValue' | 'formatOptionLabel'
  > {
  options: T[];
  value?: T | null;
  defaultValue?: T | undefined;
  onChange: (value: T | null) => void;
  formatOptionLabel?: (value: T) => ReactNode;
}

export const SelectString = <T extends string | number>({
  options,
  onChange,
  formatOptionLabel,
  value,
  defaultValue,
  ...rest
}: SelectStringProps<T, SelectOption<T>>) => {
  return (
    <Select<SelectOption<T>>
      {...rest}
      options={options.map(toOption)}
      value={value != null ? toOption(value) : null}
      defaultValue={defaultValue ? toOption(defaultValue) : undefined!}
      onChange={(d) => onChange(d ? d.value : null)}
      formatOptionLabel={formatOptionLabel ? (d, _) => formatOptionLabel(d.value) : undefined!}
      getOptionValue={toValue}
    />
  );
};

export interface SelectOption<T extends string | number = string> {
  value: T;
  label: string;
}

function toOption<T extends string | number>(value: T): SelectOption<T> {
  return { value, label: value.toString() };
}

function toValue<T extends string | number>(option: SelectOption<T>): string {
  return option.value.toString();
}
