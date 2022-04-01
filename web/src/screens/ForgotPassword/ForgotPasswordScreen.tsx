import { FC } from 'react';
import { Container } from 'web/src/components/Container/Container';
import { Card } from 'web/src/components/Card/Card';
import { ForgotPassword } from 'web/src/containers/ForgotPassword/ForgotPassword';

export const ForgotPasswordScreen: FC = () => {
  return (
    <Container maxWidth="sm" my="4">
      <Card>
        <ForgotPassword />
      </Card>
    </Container>
  );
};
