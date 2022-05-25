import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Advert } from 'web/src/modules/p2p/types';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { P2PFiatFormat } from 'web/src/components/money/P2PFiatFormat';
import { useSharedT } from 'web/src/components/shared/Adapter';
import TrustIcon from 'web/src/assets/svg/TrustIcon.svg';
import RefreshIcon from 'web/src/assets/svg/RefreshIcon.svg';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { Text } from 'web/src/components/ui/Text';
import { Stack } from 'web/src/components/ui/Stack';
import {
  AdsTable,
  AdsTableBody,
  AdsTableHeader,
  AdsTableRow,
} from 'web/src/components/shared/AdsTable/AdsTable';
import {
  AdsTableColumn,
  AdsTableHeaderColumn,
} from 'web/src/components/shared/AdsTable/AdsTableColumn';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';
import { OnlineStatusByLastActivity } from './OnlineStatus';

interface Props {
  data?: Advert[] | undefined;
  fiatSign: string;
  cryptoSign: string;
  isLoading: boolean;
  onRefresh: () => void;
}

export const Ads: FC<Props> = ({ data, fiatSign, cryptoSign, isLoading = false, onRefresh }) => {
  const t = useSharedT();
  const isMobileDevice = useIsMobileDevice();

  const buttonRefresh = (
    <Button variant="text" color="clarified" size="small" onClick={onRefresh}>
      <Box as={RefreshIcon} display="block" mr="2x" />
      {t('Refresh')}
    </Button>
  );
  const header = isMobileDevice ? (
    <Box mb="4x">{buttonRefresh}</Box>
  ) : (
    <AdsTableHeader>
      <AdsTableHeaderColumn size="medium">{t('Trader')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">{t('Payment method')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">
        {t('RateWithSymbol', { fiat: fiatSign, crypto: cryptoSign })}
      </AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">
        {t('LimitsWithSymbol', { fiat: fiatSign })}
      </AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="large" display="flex" justifyContent="flex-end">
        {buttonRefresh}
      </AdsTableHeaderColumn>
    </AdsTableHeader>
  );

  return (
    <AdsTable header={header} isLoading={isLoading}>
      {data && data.length > 0 && (
        <AdsTableBody>
          {data.map((ad) => {
            const isBuy = ad.type === 'selling';
            const trader = (
              <>
                <Box display="flex" mb="2x" alignItems="center">
                  <Box
                    as={Link}
                    to={`/trader/${ad.owner}`}
                    color={{ default: 'adTrader', hover: 'adTrader' }}
                    display="block"
                    mr="2x"
                    textOverflow="ellipsis"
                    fontWeight="strong"
                  >
                    {ad.owner}
                  </Box>
                  {ad.ownerTrusted && (
                    <Tooltip label={t('Trusted user')} placement="top">
                      <div>
                        <Box as={TrustIcon} display="block" />
                      </div>
                    </Tooltip>
                  )}
                </Box>

                <OnlineStatusByLastActivity lastActivity={ad.ownerLastActivity} />
              </>
            );
            const paymethodName = ad.paymethod.name;
            const rate = <P2PFiatFormat money={ad.rate} cryptoCurrency={ad.cryptoCurrency} />;
            const limit = (
              <>
                <P2PFiatFormat money={ad.limitCurrency.min} cryptoCurrency={ad.cryptoCurrency} /> —{' '}
                <P2PFiatFormat money={ad.limitCurrency.max} cryptoCurrency={ad.cryptoCurrency} />
              </>
            );
            const buyButton = (
              <Button
                as={Link}
                to={`/${isBuy ? 'buy' : 'sell'}/${ad.id}`}
                fullWidth={isMobileDevice}
              >
                {isBuy ? t('Buy') : t('Sell')}
              </Button>
            );

            return isMobileDevice ? (
              <Box p="4x" backgroundColor="adBg" borderRadius="1.5x">
                <Stack direction="column" marginBottom="4x">
                  {trader}
                  <Box display="flex" justifyContent="space-between">
                    <Text variant="label" color="textMuted" fontWeight="strong">
                      {t('Payment method')}
                    </Text>
                    {paymethodName}
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text variant="label" color="textMuted" fontWeight="strong">
                      {t('RateWithSymbol', { fiat: fiatSign, crypto: cryptoSign })}
                    </Text>
                    {rate}
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text variant="label" color="textMuted" fontWeight="strong">
                      {t('LimitsWithSymbol', { fiat: fiatSign })}
                    </Text>
                    {limit}
                  </Box>
                  {buyButton}
                </Stack>
              </Box>
            ) : (
              <AdsTableRow key={ad.id}>
                <AdsTableColumn size="medium">
                  <Box pl="4x">{trader}</Box>
                </AdsTableColumn>
                <AdsTableColumn size="medium">{paymethodName}</AdsTableColumn>
                <AdsTableColumn size="medium">{rate}</AdsTableColumn>
                <AdsTableColumn size="small">{limit}</AdsTableColumn>
                <AdsTableColumn size="large" display="flex" justifyContent="flex-end">
                  <Box pr="4x">{buyButton}</Box>
                </AdsTableColumn>
              </AdsTableRow>
            );
          })}
        </AdsTableBody>
      )}
    </AdsTable>
  );
};
