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
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { HelpIcon } from 'web/src/components/ui/HelpIcon';
import { Switch } from 'web/src/components/form/Switch';
import { P2PFiatFormat } from 'web/src/components/money/P2PFiatFormat';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import FilterIcon from 'web/src/assets/svg/FilterIcon.svg';
import { Card } from 'web/src/components/Card/Card';

interface Props {
  data: TraderAdvert[];
  isLoading: boolean;
}

const TAB_ALL = 'all' as const;
const TAB_PURCHASE = 'purchase' as const;
const TAB_SALE = 'sale' as const;
type Tab = typeof TAB_ALL | typeof TAB_PURCHASE | typeof TAB_SALE;

export const TraderAds: FC<Props> = ({ data, isLoading }) => {
  const { isMobileDevice, user, lang } = useAppContext();
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
      <AdsTableHeaderColumn size="medium">{t('Cryptocurrency')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">{t('Currency')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">{t('Payment method')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="medium">{t('Rate')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small">{t('Limits')}</AdsTableHeaderColumn>
      <AdsTableHeaderColumn size="small" />
    </AdsTableHeader>
  );

  const tabs = (
    <Box display="flex" gap="4x">
      <Button color="clarified" active={tab === TAB_ALL} onClick={handleClickAll}>
        {t('All')}
      </Button>
      <Button color="clarified" active={tab === TAB_PURCHASE} onClick={handleClickForPurchase}>
        {t('To buy')}
      </Button>
      <Button color="clarified" active={tab === TAB_SALE} onClick={handleClickForSale}>
        {t('To sell')}
      </Button>
    </Box>
  );

  const filter = (
    <Box display="flex" gap="4x" alignItems="center">
      <Text>
        <Box as="label" htmlFor="only_active" mr="2x">
          {t('Only active')}
        </Box>
        <HelpIcon>{t('Only active')}</HelpIcon>
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
      <Box mx="5x" mb="5x">
        {isShowFilterMobile && filter}
      </Box>
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
      let result = false;
      if (tab !== TAB_ALL) {
        result = tab === TAB_PURCHASE ? item.type === 'selling' : item.type === 'purchase';
      }

      if (isOnlyActive) {
        result = result && item.available === true;
      }

      return result;
    });
  }

  const body = (
    <>
      {controls}
      <AdsTable header={header} isLoading={isLoading}>
        {list && list.length > 0 && (
          <AdsTableBody>
            {list.map((ad) => {
              const rate = <P2PFiatFormat money={ad.rate} cryptoCurrency={ad.cryptoCurrency} />;
              const limit = (
                <>
                  <P2PFiatFormat money={ad.limitCurrency.min} cryptoCurrency={ad.cryptoCurrency} />{' '}
                  —{' '}
                  <P2PFiatFormat money={ad.limitCurrency.max} cryptoCurrency={ad.cryptoCurrency} />
                </>
              );
              const isBuy = ad.type === 'purchase';
              const actionLabel = isBuy ? t('Buy') : t('Sell');
              let actionButton;

              if (ad.owner === publicName) {
                actionButton = (
                  <Button as={Link} to={`/${lang}/p2p/adverts/${ad.id}`} fullWidth={isMobileDevice}>
                    {t('Edit')}
                  </Button>
                );
              } else {
                actionButton = ad.available ? (
                  <Button
                    as={Link}
                    to={`/${lang}/p2p/exchange/${ad.id}/${isBuy ? 'buy' : 'sell'}-${
                      ad.cryptoCurrency.code
                    }-${ad.currency.code}-${ad.paymethod.description}`}
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
                          fiat: ad.cryptoCurrency.code,
                          crypto: ad.currency.code,
                        })}
                      </Text>
                      {rate}
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text variant="label" color="textMuted" fontWeight="strong">
                        {t('LimitsWithSymbol', { fiat: ad.currency.code })}
                      </Text>
                      {limit}
                    </Box>
                    {actionButton}
                  </Box>
                </Box>
              ) : (
                <AdsTableRow key={ad.id}>
                  <AdsTableColumn size="medium">
                    <Box pl="9x">{ad.cryptoCurrency.code}</Box>
                  </AdsTableColumn>
                  <AdsTableColumn size="medium">{ad.currency.code}</AdsTableColumn>
                  <AdsTableColumn size="medium">{ad.paymethod.description}</AdsTableColumn>
                  <AdsTableColumn size="medium">{rate}</AdsTableColumn>
                  <AdsTableColumn size="small">{limit}</AdsTableColumn>
                  <AdsTableColumn size="small" display="flex" justifyContent="flex-end">
                    <Box pr="4x">{actionButton}</Box>
                  </AdsTableColumn>
                </AdsTableRow>
              );
            })}
          </AdsTableBody>
        )}
      </AdsTable>
    </>
  );

  return isMobileDevice ? (
    <>
      <Box mt="5x" mx="5x">
        <Text fontWeight="strong">{t('User ads')}</Text>
      </Box>
      {body}
    </>
  ) : (
    <Card header={<h4>{t('User ads')}</h4>}>{body}</Card>
  );
};
