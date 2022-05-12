import { FC, useState } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import * as s from './VariantSwitcher.css';

interface Variant {
  label: string;
  value: string;
}
type Target = 'tabs' | 'form';

interface VariantSwitcherItemProps {
  name?: string | undefined;
  target: Target;
  variant: Variant;
  active: boolean;
  onChange: (value: string) => void;
}

export const VariantSwitcherItem: FC<VariantSwitcherItemProps> = ({
  name,
  target,
  variant,
  active = false,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = () => onChange(variant.value);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const isTabs = target === 'tabs';

  return (
    <Box
      key={variant.value}
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
            value={variant.value}
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

interface Props {
  name?: string | undefined;
  target: Target;
  variants: Variant[];
  value: string;
  onChange: (nextValue: string) => void;
}

export const VariantSwitcher: FC<Props> = ({ name, target, variants, value, onChange }) => {
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
