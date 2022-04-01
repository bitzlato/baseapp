import { FC } from 'react';
import { Box } from 'web/src/components/Box/Box';
import { ForgotPassword } from 'web/src/containers/ForgotPassword/ForgotPassword';

export const ForgotPasswordMobileScreen: FC = () => {
  return (
    <Box col spacing="sm">
      <div />
      <Box bgColor="body">
        <ForgotPassword />
      </Box>
    </Box>
  );
};
