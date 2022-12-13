import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Spinner } from 'web/src/components/ui/Spinner';

export const Loading: FC = () => {
  return (
    <Box display="flex" justifyContent="center" mt="20x">
      <Spinner />
    </Box>
  );
};
