import { FC } from 'react';
import { Box } from 'web/src/components/Box/Box';
import { SignUp } from 'web/src/containers/SignUp/SignUp';

export const SignUpMobileScreen: FC = () => {
  return (
    <Box col spacing="sm">
      <div />
      <Box bgColor="body">
        <SignUp />
      </Box>
    </Box>
  );
};
