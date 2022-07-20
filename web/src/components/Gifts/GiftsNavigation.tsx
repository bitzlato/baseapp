import { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useT } from 'web/src/hooks/useT';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';

export const GiftsNavigation: FC = () => {
  const t = useT();
  const location = useLocation();

  return (
    <Box display="flex" alignItems="center" gap="4x">
      <Button
        as={Link}
        to="/gifts"
        variant="contained"
        color="clarified"
        active={location.pathname === '/gifts'}
      >
        {t('gifts.createGift')}
      </Button>

      <Button
        as={Link}
        to="/gifts/active"
        variant="contained"
        color="clarified"
        active={location.pathname === '/gifts/active'}
      >
        {t('gifts.activeGifts')}
      </Button>

      <Button
        as={Link}
        to="/gifts/history"
        variant="contained"
        color="clarified"
        active={location.pathname === '/gifts/history'}
      >
        {t('gifts.giftsHistory')}
      </Button>
    </Box>
  );
};
