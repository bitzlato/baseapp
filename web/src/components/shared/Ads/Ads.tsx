import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Advert } from 'web/src/modules/p2p/ad.types';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Stack } from 'web/src/components/ui/Stack';
import { FiatFormat } from 'web/src/components/money/FiatFormat';
import { useSharedT } from 'web/src/components/shared/Adapter';
import TrustIcon from 'web/src/assets/svg/TrustIcon.svg';
import RefreshIcon from 'web/src/assets/svg/RefreshIcon.svg';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { Spinner } from 'web/src/components/ui/Spinner';
import { Text } from 'web/src/components/ui/Text';
import { OnlineStatusByLastActivity } from './OnlineStatus';
import * as s from './Ads.css';

interface Props {
  data?: Advert[] | undefined;
  fiatSign: string;
  cryptoSign: string;
  isLoading: boolean;
  onRefresh: () => void;
}

export const Ads: FC<Props> = ({ data, fiatSign, cryptoSign, isLoading = false, onRefresh }) => {
  const t = useSharedT();

  let body;
  if (isLoading) {
    body = (
      <Box display="flex" justifyContent="center" py="20x">
        <Spinner />
      </Box>
    );
  } else if (data && data.length > 0) {
    body = data.map((ad) => (
      <Box
        key={ad.id}
        display="flex"
        alignItems="center"
        py="4x"
        backgroundColor="adBg"
        borderRadius="1.5x"
      >
        <Box className={s.columns.medium}>
          <Box pl="4x">
            <Box display="flex" mb="2x" alignItems="center">
              {/* TODO: Link */}
              <Box
                as={Link}
                to="/board"
                color={{ default: 'adTrader', hover: 'adTrader' }}
                display="block"
                mr="2x"
                textOverflow="ellipsis"
              >
                {ad.owner}
              </Box>
              <Tooltip label={t('Trusted user')} placement="top">
                <div>
                  <Box as={TrustIcon} display="block" />
                </div>
              </Tooltip>
            </Box>

            <OnlineStatusByLastActivity lastActivity={ad.ownerLastActivity} />
          </Box>
        </Box>
        <Box className={s.columns.medium}>{ad.paymethod.name}</Box>
        <Box className={s.columns.medium}>
          <FiatFormat money={ad.rate} cryptoCurrency={ad.cryptoCurrency} />
        </Box>
        <Box className={s.columns.small}>
          <FiatFormat money={ad.limitCurrency.min} cryptoCurrency={ad.cryptoCurrency} /> —{' '}
          <FiatFormat money={ad.limitCurrency.max} cryptoCurrency={ad.cryptoCurrency} />
        </Box>
        <Box className={s.columns.large} display="flex" justifyContent="flex-end">
          <Box pr="4x">
            <Button>{ad.type === 'selling' ? t('Sell') : t('Buy')}</Button>
          </Box>
        </Box>
      </Box>
    ));
  } else {
    body = (
      <Box textAlign="center" py="20x">
        <Box mb="6x">
          <Text>{t('ad.empty')}</Text>
        </Box>
        <Button as={Link} to="/">
          {t('Create advert')}
        </Button>
      </Box>
    );
  }

  return (
    <Box fontSize="medium" color="text" mb="5x">
      <Box display="flex" alignItems="center" pb="5x">
        <Box className={s.columns.medium} color="adTableHeader" fontSize="medium">
          {t('Traider')}
        </Box>
        <Box className={s.columns.medium} color="adTableHeader" fontSize="medium">
          {t('Payment method')}
        </Box>
        <Box className={s.columns.medium} color="adTableHeader" fontSize="medium">
          {t('Rate', { fiat: fiatSign, crypto: cryptoSign })}
        </Box>
        <Box className={s.columns.small} color="adTableHeader" fontSize="medium">
          {t('Limits', { fiat: fiatSign })}
        </Box>
        <Box className={s.columns.large} display="flex" justifyContent="flex-end">
          <Button variant="text" color="clarified" size="small" onClick={onRefresh}>
            <Box as={RefreshIcon} display="block" mr="2x" />
            {t('Refresh')}
          </Button>
        </Box>
      </Box>
      <Stack direction="column" marginBottom="4x">
        {body}
      </Stack>
    </Box>
  );
};
