import { FC } from 'react';
import { Container } from 'web/src/components/ui/Container';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { EmailVerificationForm } from 'web/src/components/user/EmailVerificationForm';
import { useT } from 'web/src/hooks/useT';

export const EmailVerificationContainer: FC = () => {
  const t = useT();

  return (
    <Container maxWidth="md" my="5x">
      <Box bg="block" pt="4x" borderRadius="2x">
        <Box px="6x" py="5x">
          <Text variant="lead" fontWeight="strong" textAlign="center">
            {t('Confirm your email')}
          </Text>
        </Box>
        <EmailVerificationForm />
      </Box>
    </Container>
  );
};
