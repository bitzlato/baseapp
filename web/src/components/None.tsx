import { FC } from 'react';
import { Box } from './Box/Box';

export const None: FC = () => {
  return (
    <Box as="span" textColor="secondary">
      -
    </Box>
  );
};
