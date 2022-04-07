import { Container } from 'web/src/components/Container/Container';
import { Card } from 'web/src/components/Card/Card';
import { SignIn } from 'web/src/containers/SignIn/SignIn';
import { FC } from 'react';

export const SignInScreen: FC = () => {
  return (
    <Container maxWidth="sm" my="4">
      <Card>
        <SignIn />
      </Card>
    </Container>
  );
};