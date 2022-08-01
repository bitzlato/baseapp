import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { WarningIcon } from 'web/src/mobile/assets/images/WarningIcon';
import { Text } from 'web/src/components/ui/Text';

export const AdError: FC = ({ children }) => (
  <Box display="flex" alignItems="center" mt="3x">
    <WarningIcon />
    <Text fontWeight="strong">{children}</Text>
  </Box>
);
