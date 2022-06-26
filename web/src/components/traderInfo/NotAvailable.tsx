import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';

interface Props {
  signin?: boolean;
}

export const NotAvailable: FC<Props> = ({ children, signin = false }) => {
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
      px="4x"
      borderWidth="1x"
      borderColor="traderBorder"
      borderStyle="solid"
      borderRadius="1.5x"
    >
      <Text variant="label">{children}</Text>
      {signin && (
        <Button as={Link} to="/signin">
          {t('Sign In')}
        </Button>
      )}
    </Box>
  );
};
