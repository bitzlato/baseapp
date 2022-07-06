import { FC } from 'react';
import { Container } from 'web/src/components/Container/Container';
import { Card } from 'web/src/components/Card/Card';
import { ResetPassword } from 'web/src/containers/ResetPassword/ResetPassword';

export const ResetPasswordScreen: FC = () => {
  return (
    <Container maxWidth="sm" my="6x">
      <Card>
        <ResetPassword />
      </Card>
    </Container>
  );
};
