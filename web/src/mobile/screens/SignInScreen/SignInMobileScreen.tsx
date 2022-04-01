import { FC } from 'react';
import { Box } from 'web/src/components/Box/Box';
import { SignIn } from 'web/src/containers/SignIn/SignIn';

export const SignInMobileScreen: FC = () => {
  return (
    <Box col spacing="sm">
      <div />
      <Box bgColor="body">
        <SignIn />
      </Box>
    </Box>
  );
};
