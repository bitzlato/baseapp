import { FC, useState } from 'react';
import { TraderAdvert } from 'web/src/hooks/data/useUserAds';
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
import { useSharedT } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Stack } from 'web/src/components/ui/Stack';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { HelpIcon } from 'web/src/components/ui/HelpIcon';
import { Switch } from 'web/src/components/form/Switch';
import { P2PFiatFormat } from 'web/src/components/money/P2PFiatFormat';

// import * as s from './TraderAds.css';

interface Props {
  data: TraderAdvert[];
  isLoading: boolean;
}

const FILTER_ALL = 'all' as const;
const FILTER_PURCHASE = 'purchase' as const;
const FILTER_SALE = 'sale' as const;

export const TraderAds: FC<Props> = ({ data, isLoading }) => {
  const t = useSharedT();
  const [filter, setFilter] = useState<
    typeof FILTER_ALL | typeof FILTER_PURCHASE | typeof FILTER_SALE
  >(FILTER_ALL);
  const [isOnlyActive, setIsOnlyActive] = useState(false);

  const handleClickAll = () => setFilter(FILTER_ALL);
  const handleClickForPurchase = () => setFilter(FILTER_PURCHASE);
  const handleClickForSale = () => setFilter(FILTER_SALE);
  const handleChangeIsOnlyActive = () => setIsOnlyActive((prev) => !prev);

  const header = (
    <AdsTableHeader>
      <AdsTableHeaderColumn size="medium">{t('Cryptocurrency')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">{t('Currency')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">{t('Payment method')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">{t('Rate')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Limits')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small" />
    </AdsTableHeader>
  );

  let list = data;
  if (filter !== FILTER_ALL || isOnlyActive) {
    list = data.filter((item) => {
      let result = false;
      if (filter !== FILTER_ALL) {
        result = filter === FILTER_PURCHASE ? item.type === 'selling' : item.type === 'purchase';
      }

      if (isOnlyActive) {
        result = result && item.available === true;
      }

      return result;
    });
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" my="8x">
        <Stack marginRight="4x">
          <Button color="clarified" active={filter === FILTER_ALL} onClick={handleClickAll}>
            {t('All')}
          </Button>
          <Button
            color="clarified"
            active={filter === FILTER_PURCHASE}
            onClick={handleClickForPurchase}
          >
            {t('Buying')}
          </Button>
          <Button color="clarified" active={filter === FILTER_SALE} onClick={handleClickForSale}>
            {t('Selling')}
          </Button>
        </Stack>

        <Stack marginRight="4x" alignItems="center">
          <Text>
            <Box as="label" htmlFor="only_active" mr="2x">
              {t('Only active')}
            </Box>
            <HelpIcon>{t('Only active')}</HelpIcon>
          </Text>
          <Switch id="only_active" checked={isOnlyActive} onChange={handleChangeIsOnlyActive} />
        </Stack>
      </Box>
      <AdsTable header={header} isLoading={isLoading}>
        {list && list.length > 0 && (
          <AdsTableBody>
            {list.map((ad) => (
              <AdsTableRow key={ad.id}>
                <AdsTableColumn size="medium">
                  <Box pl="9x">{ad.cryptoCurrency.code}</Box>
                </AdsTableColumn>
                <AdsTableColumn size="medium">{ad.currency.code}</AdsTableColumn>
                <AdsTableColumn size="medium">{ad.paymethod.description}</AdsTableColumn>
                <AdsTableColumn size="medium">
                  <P2PFiatFormat money={ad.rate} cryptoCurrency={ad.cryptoCurrency} />
                </AdsTableColumn>
                <AdsTableColumn size="small">
                  <P2PFiatFormat money={ad.limitCurrency.min} cryptoCurrency={ad.cryptoCurrency} />{' '}
                  —{' '}
                  <P2PFiatFormat money={ad.limitCurrency.max} cryptoCurrency={ad.cryptoCurrency} />
                </AdsTableColumn>
                <AdsTableColumn size="small" display="flex" justifyContent="flex-end">
                  <Box pr="4x">
                    <Button disabled={!ad.available}>
                      {ad.type === 'selling' ? t('Sell') : t('Buy')}
                    </Button>
                  </Box>
                </AdsTableColumn>
              </AdsTableRow>
            ))}
          </AdsTableBody>
        )}
      </AdsTable>
    </>
  );
};
