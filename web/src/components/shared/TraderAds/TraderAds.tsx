import { FC, useState } from 'react';
import { TraderAdvert } from 'web/src/hooks/data/useTraderAds';
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
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { HelpIcon } from 'web/src/components/ui/HelpIcon';
import { Switch } from 'web/src/components/form/Switch';
import { P2PFiatFormat } from 'web/src/components/money/P2PFiatFormat';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import FilterIcon from 'web/src/assets/svg/FilterIcon.svg';
import { Card, CardHeader } from 'web/src/components/ui/Card';
import { useUser } from 'web/src/components/app/UserContext';
import { TraderAdsEmpty } from './TraderAdsEmpty';

interface Props {
  data: TraderAdvert[];
  isLoading: boolean;
}

const TAB_ALL = 'all' as const;
const TAB_PURCHASE = 'purchase' as const;
const TAB_SALE = 'sale' as const;
type Tab = typeof TAB_ALL | typeof TAB_PURCHASE | typeof TAB_SALE;

export const TraderAds: FC<Props> = ({ data, isLoading }) => {
  const user = useUser();
  const { isMobileDevice } = useAppContext();
  const { t, Link } = useAdapterContext();
  const [tab, setTab] = useState<Tab>(TAB_ALL);
  const [isOnlyActive, setIsOnlyActive] = useState(false);
  const [isShowFilterMobile, setShowFilterMobile] = useState(false);

  const publicName =
    user?.bitzlato_user?.user_profile.public_name ??
    user?.bitzlato_user?.user_profile.generated_name;

  const handleClickAll = () => setTab(TAB_ALL);
  const handleClickForPurchase = () => setTab(TAB_PURCHASE);
  const handleClickForSale = () => setTab(TAB_SALE);
  const handleChangeIsOnlyActive = () => setIsOnlyActive((prev) => !prev);
  const handleClickFilter = () => setShowFilterMobile((prev) => !prev);

  const header = !isMobileDevice && (
    <AdsTableHeader>
      <AdsTableHeaderColumn size="small">{t('Cryptocurrency')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Currency')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">{t('Payment method')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">{t('Rate')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">{t('Limits')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="large" />
    </AdsTableHeader>
  );

  const tabs = (
    <Box display="flex" gap="4x">
      <Box flexShrink={0}>
        <Button color="clarified" active={tab === TAB_ALL} onClick={handleClickAll}>
          {t('All')}
        </Button>
      </Box>
      <Box flexShrink={0}>
        <Button color="clarified" active={tab === TAB_PURCHASE} onClick={handleClickForPurchase}>
          {t('To buy')}
        </Button>
      </Box>
      <Box flexShrink={0}>
        <Button color="clarified" active={tab === TAB_SALE} onClick={handleClickForSale}>
          {t('To sell')}
        </Button>
      </Box>
    </Box>
  );

  const filter = (
    <Box display="flex" gap="4x" alignItems="center">
      <Text>
        <Box as="label" htmlFor="only_active" mr="2x">
          {t('Only active')}
        </Box>
        <HelpIcon>{t('Show active ads only')}</HelpIcon>
      </Text>
      <Switch id="only_active" checked={isOnlyActive} onChange={handleChangeIsOnlyActive} />
    </Box>
  );

  const controls = isMobileDevice ? (
    <Box display="flex" flexDirection="column" width="full">
      <Box display="flex" flexShrink={0} gap="4x" overflowY="auto" px="5x" pt="5x" pb="4x">
        <Button onClick={handleClickFilter}>
          <FilterIcon />
        </Button>

        {tabs}
      </Box>

      {isShowFilterMobile && (
        <Box mx="5x" mb="5x">
          {filter}
        </Box>
      )}
    </Box>
  ) : (
    <Box display="flex" justifyContent="space-between" mb="6x">
      {tabs}
      {filter}
    </Box>
  );

  let list = data;
  if (tab !== TAB_ALL || isOnlyActive) {
    list = data.filter((item) => {
      let passable = true;
      if (tab !== TAB_ALL) {
        passable = tab === TAB_PURCHASE ? item.type === 'selling' : item.type === 'purchase';
      }

      if (isOnlyActive) {
        passable = passable && item.available === true;
      }

      return passable;
    });
  }

  const body = (
    <AdsTable header={header} emptyContent={<TraderAdsEmpty />} isLoading={isLoading}>
      {list && list.length > 0 && (
        <AdsTableBody>
          {list.map((ad) => {
            const rate = <P2PFiatFormat money={ad.rate} cryptoCurrency={ad.cryptoCurrency} />;
            const limit = (
              <>
                <P2PFiatFormat money={ad.limitCurrency.min} cryptoCurrency={ad.cryptoCurrency} /> —{' '}
                <P2PFiatFormat money={ad.limitCurrency.max} cryptoCurrency={ad.cryptoCurrency} />
              </>
            );
            let actionButton;
            if (ad.owner === publicName) {
              actionButton = (
                <Button as={Link} to={`/p2p/adverts/${ad.id}`} fullWidth={isMobileDevice}>
                  {t('Edit')}
                </Button>
              );
            } else {
              const isBuy = ad.type === 'purchase';
              const actionLabel = isBuy ? t('Buy') : t('Sell');
              actionButton = ad.available ? (
                <Button
                  as={Link}
                  to={`/p2p/exchange/${ad.id}/${isBuy ? 'buy' : 'sell'}-${ad.cryptoCurrency.code}-${
                    ad.currency.code
                  }-${ad.paymethod.description}`}
                  fullWidth={isMobileDevice}
                >
                  {actionLabel}
                </Button>
              ) : (
                <Button disabled>{actionLabel}</Button>
              );
            }

            return isMobileDevice ? (
              <Box key={ad.id} p="4x" backgroundColor="adBg" borderRadius="1.5x">
                <Box display="flex" flexDirection="column" gap="4x">
                  <Box display="flex" justifyContent="space-between">
                    <Text variant="label" color="textMuted" fontWeight="strong">
                      {t('Cryptocurrency')}
                    </Text>
                    <Text textAlign="right" fontSize="medium">
                      {ad.cryptoCurrency.code}
                    </Text>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text variant="label" color="textMuted" fontWeight="strong">
                      {t('Сurrency')}
                    </Text>
                    <Text textAlign="right" fontSize="medium">
                      {ad.currency.code}
                    </Text>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text variant="label" color="textMuted" fontWeight="strong">
                      {t('Payment method')}
                    </Text>
                    <Text textAlign="right" fontSize="medium">
                      {ad.paymethod.description}
                    </Text>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text variant="label" color="textMuted" fontWeight="strong">
                      {t('RateWithSymbol', {
                        fiat: ad.currency.sign,
                        crypto: ad.cryptoCurrency.sign,
                      })}
                    </Text>
                    {rate}
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text variant="label" color="textMuted" fontWeight="strong">
                      {t('LimitsWithSymbol', { fiat: ad.currency.sign })}
                    </Text>
                    {limit}
                  </Box>
                  {actionButton}
                </Box>
              </Box>
            ) : (
              <AdsTableRow key={ad.id}>
                <Box
                  position="absolute"
                  backgroundColor={ad.available ? 'success' : 'danger'}
                  width="2x"
                  height="full"
                />

                <AdsTableColumn size="small">
                  <Box pl="9x">{ad.cryptoCurrency.code}</Box>
                </AdsTableColumn>
                <AdsTableColumn size="small">{ad.currency.code}</AdsTableColumn>
                <AdsTableColumn size="medium">{ad.paymethod.description}</AdsTableColumn>
                <AdsTableColumn size="medium">{rate}</AdsTableColumn>
                <AdsTableColumn size="medium">{limit}</AdsTableColumn>
                <AdsTableColumn size="large" display="flex" justifyContent="flex-end">
                  <Box pr="4x">{actionButton}</Box>
                </AdsTableColumn>
              </AdsTableRow>
            );
          })}
        </AdsTableBody>
      )}
    </AdsTable>
  );

  return (
    <Card>
      <CardHeader>{t('User ads')}</CardHeader>
      {isMobileDevice ? (
        <>
          {controls}
          <Box px="5x" pb="5x">
            {body}
          </Box>
        </>
      ) : (
        <Box p="6x">
          {controls}
          {body}
        </Box>
      )}
    </Card>
  );
};
