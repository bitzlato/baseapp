import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';

export const MenuMobileBody: FC = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" ml="6x">
      {children}
    </Box>
  );
};
