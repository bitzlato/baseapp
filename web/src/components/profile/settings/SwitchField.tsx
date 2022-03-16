import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Text } from 'web/src/components/ui/Text';
import { Box } from 'web/src/components/ui/Box';
import { Switch } from 'web/src/components/form/Switch';

interface Props {
  defaultValue?: boolean | undefined;
  id: string;
  label: string;
  helpText?: ReactNode | undefined;
  value?: boolean;
  onChange: (nextValue: boolean) => void;
}

export const SwitchField: FC<Props> = ({
  defaultValue = false,
  id,
  label,
  helpText,
  value,
  onChange,
}) => {
  const isControlled = value !== undefined;
  const prevValue = useRef(defaultValue);
  const [on, setOn] = useState(defaultValue);
  const handleChange = () => {
    if (isControlled) {
      return onChange(!value);
    }

    return setOn((prev) => !prev);
  };

  useEffect(() => {
    if (prevValue.current !== on && !isControlled) {
      onChange(on);
      prevValue.current = on;
    }
  }, [on, isControlled, onChange]);

  let help = helpText;
  if (typeof helpText === 'string') {
    help = (
      <Text variant="label" color="textMuted">
        {helpText}
      </Text>
    );
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box mr="4x">
        <Box as="label" htmlFor={id} display="block" mb="2x">
          <Text variant="label">{label}</Text>
        </Box>
        {help}
      </Box>
      <Switch id={id} checked={isControlled ? value : on} onChange={handleChange} />
    </Box>
  );
};
