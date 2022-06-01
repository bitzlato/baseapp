import { FC, ReactNode } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Spinner } from 'web/src/components/ui/Spinner';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { Stack } from 'web/src/components/ui/Stack';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';

export const AdsTableHeader: FC = ({ children }) => (
  <Box display="flex" alignItems="center" pb="5x">
    {children}
  </Box>
);

export const AdsTableBody: FC = ({ children }) => (
  <Stack direction="column" marginBottom="4x">
    {children}
  </Stack>
);

export const AdsTableRow: FC = ({ children }) => (
  <Box display="flex" alignItems="center" py="4x" backgroundColor="adBg" borderRadius="1.5x">
    {children}
  </Box>
);

interface Props {
  header: ReactNode;
  isLoading: boolean;
}

export const AdsTable: FC<Props> = ({ children, header, isLoading }) => {
  const { lang, isMobileDevice } = useAppContext();
  const { t, Link } = useAdapterContext();

  let body;
  if (isLoading) {
    body = (
      <Box display="flex" justifyContent="center" py="20x">
        <Spinner />
      </Box>
    );
  } else if (children) {
    body = children;
  } else {
    body = (
      <Box textAlign="center" py="20x" px="4x">
        <Box mb="6x">
          <Text variant={isMobileDevice ? 'title' : 'body'}>{t('ad.empty')}</Text>
        </Box>
        <Button as={Link} to={`/${lang}/p2p/adverts/create`}>
          {t('Create advert')}
        </Button>
      </Box>
    );
  }

  return (
    <Box fontSize="medium" color="text" mb="5x">
      {header}
      {body}
    </Box>
  );
};
