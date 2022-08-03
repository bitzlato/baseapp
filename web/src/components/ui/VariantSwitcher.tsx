import { ReactNode, useState } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import * as s from './VariantSwitcher.css';

interface Variant<TValue> {
  label: ReactNode;
  value: TValue;
}
type Target = 'tabs' | 'form';

interface VariantSwitcherItemProps<TValue> {
  name?: string | undefined;
  target: Target;
  variant: Variant<TValue>;
  active: boolean;
  onChange: (value: TValue) => void;
}

export const VariantSwitcherItem = <TValue,>({
  name,
  target,
  variant,
  active = false,
  onChange,
}: VariantSwitcherItemProps<TValue>) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = () => onChange(variant.value);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const isTabs = target === 'tabs';
  const stringifiedValue = `${variant.value}`;

  return (
    <Box
      key={stringifiedValue}
      as={isTabs ? 'button' : 'label'}
      className={cn(s.control[active ? 'active' : 'base'], isFocused && s.controlFocused)}
      onClick={isTabs ? handleChange : undefined}
    >
      {isTabs ? (
        variant.label
      ) : (
        <>
          <input
            className={s.input}
            type="radio"
            name={name ?? 'variantSwitcher'}
            value={stringifiedValue}
            checked={active}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {variant.label}
        </>
      )}
    </Box>
  );
};

interface Props<TValue> {
  name?: string | undefined;
  target: Target;
  variants: Variant<TValue>[];
  value: TValue;
  onChange: (nextValue: TValue) => void;
}

export const VariantSwitcher = <TValue,>({
  name,
  target,
  variants,
  value,
  onChange,
}: Props<TValue>) => {
  return (
    <Box
      display="flex"
      justifyContent="stretch"
      width="full"
      height="11x"
      borderRadius="1.5x"
      borderWidth="1x"
      borderStyle="solid"
      borderColor="variantSwitcherBorder"
    >
      {variants.map((variant) => (
        <VariantSwitcherItem
          key={`${variant.value}`}
          name={name}
          target={target}
          variant={variant}
          active={variant.value === value}
          onChange={onChange}
        />
      ))}
    </Box>
  );
};
