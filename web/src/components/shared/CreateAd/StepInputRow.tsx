import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import * as s from './StepInputRow.css';

interface Props {
  label: string;
}

export const StepInputRow: FC<Props> = ({ label, children }) => {
  return (
    <Box
      display="flex"
      flexDirection={{ mobile: 'column', desktop: 'row' }}
      alignItems={{ mobile: 'flex-start', desktop: 'center' }}
      justifyContent="space-between"
    >
      <Text variant="label">{label}</Text>
      <Box
        className={s.inputBox}
        marginLeft={{ mobile: '0', desktop: '4x' }}
        marginTop={{ mobile: '3x', desktop: '0' }}
      >
        {children}
      </Box>
    </Box>
  );
};
