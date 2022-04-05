import { FC } from 'react';
import { Box } from 'web/src/components/Box/Box';
import { ResetPassword } from 'web/src/containers/ResetPassword/ResetPassword';

export const ResetPasswordMobileScreen: FC = () => {
  return (
    <Box col spacing="sm">
      <div />
      <Box bgColor="body">
        <ResetPassword />
      </Box>
    </Box>
  );
};
