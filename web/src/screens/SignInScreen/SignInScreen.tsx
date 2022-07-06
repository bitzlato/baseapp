import { Container } from 'web/src/components/ui/Container';
import { Card } from 'web/src/components/Card/Card';
import { SignIn } from 'web/src/containers/SignIn/SignIn';
import { FC } from 'react';

export const SignInScreen: FC = () => {
  return (
    <Container maxWidth="sm" my="6x">
      <Card>
        <SignIn />
      </Card>
    </Container>
  );
};
