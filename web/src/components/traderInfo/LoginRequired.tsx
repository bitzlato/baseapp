import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
// import * as s from './LoginRequired.css';

export const LoginRequired: FC = ({ children }) => {
  const { t, Link } = useAdapterContext();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      flexGrow={1}
      gap="2x"
      mt="4x"
      pt="6x"
      borderWidth="1x"
      borderColor="traderBorder"
      borderStyle="solid"
      borderRadius="1.5x"
    >
      <Text variant="label">{children}</Text>
      <Button as={Link} to="/signin">
        {t('Sign In')}
      </Button>
    </Box>
  );
};
