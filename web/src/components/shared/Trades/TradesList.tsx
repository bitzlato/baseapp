import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import {
  AdsTable,
  AdsTableBody,
  AdsTableHeader,
} from 'web/src/components/shared/AdsTable/AdsTable';
import { AdsTableHeaderColumn } from 'web/src/components/shared/AdsTable/AdsTableColumn';
import { Trade } from 'web/src/modules/p2p/trade.types';
import { useAppContext } from 'web/src/components/app/AppContext';
import { TradesListItem } from './TradesListItem';

interface Props {
  data?: Trade[] | undefined;
  isLoading: boolean;
}

export const TradesList: FC<Props> = ({ data, isLoading = false }) => {
  const { isMobileDevice } = useAppContext();
  const { t, Link } = useAdapterContext();

  const header = isMobileDevice ? null : (
    <AdsTableHeader>
      <AdsTableHeaderColumn size="small">{t('Type')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Date')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Number')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="large">{t('Trade amount')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Payment method')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Partner')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">{t('Trade status')}</AdsTableHeaderColumn>
    </AdsTableHeader>
  );

  const emptyContent = (
    <Box textAlign="center" py="20x" px="4x">
      <Box mb="6x">
        <Text variant={isMobileDevice ? 'title' : 'body'}>{t('trades.empty')}</Text>
      </Box>
      <Button as={Link} to="/p2p">
        {t('Find an offer')}
      </Button>
    </Box>
  );

  return (
    <AdsTable header={header} emptyContent={emptyContent} isLoading={isLoading}>
      {data && data.length > 0 && (
        <AdsTableBody>
          {data.map((trade) => (
            <TradesListItem key={trade.id} trade={trade} />
          ))}
        </AdsTableBody>
      )}
    </AdsTable>
  );
};
