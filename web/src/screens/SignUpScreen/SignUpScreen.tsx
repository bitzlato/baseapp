import { FC } from 'react';
import { Container } from 'web/src/components/Container/Container';
import { Card } from 'web/src/components/Card/Card';
import { SignUp } from 'web/src/containers/SignUp/SignUp';

export const SignUpScreen: FC = () => {
  return (
    <Container maxWidth="sm" my="4">
      <Card>
        <SignUp />
      </Card>
    </Container>
  );
};
