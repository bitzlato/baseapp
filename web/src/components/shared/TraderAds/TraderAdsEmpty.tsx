import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { useAppContext } from 'web/src/components/app/AppContext';
import { useAdapterContext } from 'web/src/components/shared/Adapter';

export const TraderAdsEmpty: FC = () => {
  const { t, Link } = useAdapterContext();
  const { isMobileDevice } = useAppContext();

  return (
    <Box textAlign="center" py="20x" px="4x">
      <Box mb="6x">
        <Text variant={isMobileDevice ? 'title' : 'body'}>{t('traderAds.empty')}</Text>
      </Box>
      <Button as={Link} to="/p2p">
        {t('Go to')}
      </Button>
    </Box>
  );
};
