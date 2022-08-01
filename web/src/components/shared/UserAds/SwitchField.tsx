import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Text } from 'web/src/components/ui/Text';
import { Box, BoxProps } from 'web/src/components/ui/Box';
import { Switch } from 'web/src/components/form/Switch';
import { Spinner } from 'web/src/components/ui/Spinner';
import * as s from './SwitchField.css';

interface Props {
  id?: string;
  label: ReactNode;
  helpText?: ReactNode | undefined;
  isLoading?: boolean;
  alignItems?: BoxProps['alignItems'];
  justifyContent?: BoxProps['justifyContent'];
  width?: BoxProps['width'];
  defaultValue?: boolean | undefined;
  labelPosition?: 'left' | 'right';
  value?: boolean;
  onChange: (nextValue: boolean) => void;
}

export const SwitchField: FC<Props> = ({
  id,
  label,
  helpText,
  isLoading = false,
  alignItems = 'center',
  justifyContent = 'space-between',
  width = 'auto',
  defaultValue = false,
  labelPosition = 'left',
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

  const labelContent = (
    <>
      <Box as="label" htmlFor={id} display="block" mb={help ? '2x' : '0'}>
        {typeof label === 'string' ? <Text variant="label">{label}</Text> : label}
      </Box>
      {help}
    </>
  );

  return (
    <Box display="flex" justifyContent={justifyContent} alignItems={alignItems} width={width}>
      {labelPosition === 'left' ? <Box mr="4x">{labelContent}</Box> : null}
      <Box position="relative" flexShrink={0}>
        {isLoading ? (
          <Box className={s.spinnerContainer}>
            <Spinner size="5x" />
          </Box>
        ) : null}
        <Box className={isLoading ? s.switchLoading : undefined}>
          <Switch
            id={id}
            checked={isControlled ? value : on}
            disabled={isLoading}
            onChange={handleChange}
          />
        </Box>
      </Box>
      {labelPosition === 'right' ? <Box ml="4x">{labelContent}</Box> : null}
    </Box>
  );
};
