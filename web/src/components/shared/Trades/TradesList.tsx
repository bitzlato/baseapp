import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
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
import { Trade } from 'web/src/modules/p2p/types';
import { createMoney } from 'web/src/helpers/money';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';

interface Props {
  data?: Trade[] | undefined;
  isLoading: boolean;
}

export const TradesList: FC<Props> = ({ data, isLoading = false }) => {
  const { t, Link } = useAdapterContext();

  const buttonSort = (
    <Button variant="text" color="clarified" size="small" onClick={() => {}}>
      SORT
    </Button>
  );

  const header = (
    <AdsTableHeader>
      <AdsTableHeaderColumn size="small">{t('Type')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Status')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Partner')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="large">{t('Trade amount')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Payment method')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Date and number')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small" display="flex" justifyContent="flex-end">
        {buttonSort}
      </AdsTableHeaderColumn>
    </AdsTableHeader>
  );

  return (
    <AdsTable header={header} isLoading={isLoading}>
      {data && data.length > 0 && (
        <AdsTableBody>
          {data.map((trade) => {
            const isPurchase = trade.type === 'purchase';
            const trader = (
              <Box
                as={Link}
                to={`/trader/${trade.partner}`}
                color={{ default: 'adTrader', hover: 'adTrader' }}
                display="block"
                mr="2x"
                textOverflow="ellipsis"
                fontWeight="strong"
              >
                {trade.partner}
              </Box>
            );

            return (
              <AdsTableRow key={trade.id}>
                <AdsTableColumn size="small">
                  <Box pl="4x">{isPurchase ? t('Purchase') : t('Selling')}</Box>
                </AdsTableColumn>
                <AdsTableColumn size="small">{t(`tradeStatus.${trade.status}`)}</AdsTableColumn>
                <AdsTableColumn size="small">{trader}</AdsTableColumn>
                <AdsTableColumn size="large">
                  <MoneyFormat
                    money={createMoney(trade.currency.amount, trade.currency.moneyCurrency)}
                  />{' '}
                  /{' '}
                  <MoneyFormat
                    money={createMoney(
                      trade.cryptoCurrency.amount,
                      trade.cryptoCurrency.moneyCurrency,
                    )}
                  />
                </AdsTableColumn>
                <AdsTableColumn size="small">{trade.paymethod}</AdsTableColumn>
                <AdsTableColumn size="small">
                  {new Date(trade.date).toISOString()}
                </AdsTableColumn>
                <AdsTableColumn size="small">
                  <Box pr="4x" />
                </AdsTableColumn>
              </AdsTableRow>
            );
          })}
        </AdsTableBody>
      )}
    </AdsTable>
  );
};
