import { FC } from 'react';
import { Container } from 'web/src/components/ui/Container';
import { Card } from 'web/src/components/Card/Card';
import { ForgotPassword } from 'web/src/containers/ForgotPassword/ForgotPassword';

export const ForgotPasswordScreen: FC = () => {
  return (
    <Container maxWidth="sm" my="6x">
      <Card>
        <ForgotPassword />
      </Card>
    </Container>
  );
};
