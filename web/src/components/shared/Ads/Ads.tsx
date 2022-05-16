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

  const header = (
    <AdsTableHeader>
      <AdsTableHeaderColumn size="medium">{t('Traider')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">{t('Payment method')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">
        {t('RateWithSymbol', { fiat: fiatSign, crypto: cryptoSign })}
      </AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">
        {t('LimitsWithSymbol', { fiat: fiatSign })}
      </AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="large" display="flex" justifyContent="flex-end">
        <Button variant="text" color="clarified" size="small" onClick={onRefresh}>
          <Box as={RefreshIcon} display="block" mr="2x" />
          {t('Refresh')}
        </Button>
      </AdsTableHeaderColumn>
    </AdsTableHeader>
  );

  return (
    <AdsTable header={header} isLoading={isLoading}>
      {data && data.length > 0 && (
        <AdsTableBody>
          {data.map((ad) => (
            <AdsTableRow key={ad.id}>
              <AdsTableColumn size="medium">
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
              </AdsTableColumn>
              <AdsTableColumn size="medium">{ad.paymethod.name}</AdsTableColumn>
              <AdsTableColumn size="medium">
                <P2PFiatFormat money={ad.rate} cryptoCurrency={ad.cryptoCurrency} />
              </AdsTableColumn>
              <AdsTableColumn size="small">
                <P2PFiatFormat money={ad.limitCurrency.min} cryptoCurrency={ad.cryptoCurrency} /> —{' '}
                <P2PFiatFormat money={ad.limitCurrency.max} cryptoCurrency={ad.cryptoCurrency} />
              </AdsTableColumn>
              <AdsTableColumn size="large" display="flex" justifyContent="flex-end">
                <Box pr="4x">
                  <Button>{ad.type === 'selling' ? t('Sell') : t('Buy')}</Button>
                </Box>
              </AdsTableColumn>
            </AdsTableRow>
          ))}
        </AdsTableBody>
      )}
    </AdsTable>
  );
};
