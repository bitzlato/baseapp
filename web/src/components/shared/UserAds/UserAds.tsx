import { FC, useMemo, useState } from 'react';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/ui/Container';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { useCurrenUserAds } from 'web/src/hooks/data/useUserAds';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useTradeStatus } from 'web/src/hooks/data/useTradeStatus';
import { useUpdateTradeStatus } from 'web/src/hooks/mutations/useUpdateTradeStatus';
import { Breadcrumbs, BreadcrumbsItem } from 'web/src/components/ui/Breadcrumbs';
import { UserAdsList } from './UserAdsList';
import {
  UserAdsFilter,
  UserAdsFilterMobile,
  DEFAULT_FILTER,
  UserAdsFilterParams,
} from './UserAdsFilter';
import { SetRate } from './SetRate';
import { UserAdsTradingStatusSwitch } from './UserAdsTradingStatusSwitch';
import { UserAdsEnableTradingSwitch } from './UserAdsEnableTradingSwitch';
import { SelectCryptoCurrency } from './SelectCryptoCurrency';
import * as s from './UserAds.css';
import { UserAdsAlerts } from './UserAdsAlerts';

const USER_ADS_FILTER_KEY = 'userAdsFilterCryptocurrency';

export const UserAds: FC = () => {
  const { t, Link } = useAdapterContext();
  const { lang, isMobileDevice } = useAppContext();
  const { data: tradeStatuses } = useTradeStatus();
  const [updateTradeStatus] = useUpdateTradeStatus();
  const [filterParams, setFilterParams] = useState<UserAdsFilterParams>(() => {
    const lastFilter = JSON.parse(localStorage.getItem(USER_ADS_FILTER_KEY) || '{}') ?? {};

    return {
      ...DEFAULT_FILTER,
      ...lastFilter,
    };
  });
  const isTradeEnabled = tradeStatuses?.[filterParams.cryptocurrency] ?? false;

  const { data, isValidating, mutate } = useCurrenUserAds(lang);
  const filteredAds = useMemo(() => {
    let filtered = data;

    if (filterParams.cryptocurrency) {
      filtered = filtered?.filter((ad) => ad.cryptocurrency === filterParams.cryptocurrency);
    }

    if (filterParams.onlyActive === true) {
      filtered = filtered?.filter((ad) => ad.status === 'active');
    }

    if (filterParams.type) {
      filtered = filtered?.filter((ad) => ad.type === filterParams.type);
    }

    return filtered;
  }, [data, filterParams]);
  const isAdsEmpty = filteredAds?.length === 0;
  const isAllEnabled = filteredAds?.every((ad) => ad.status === 'active') ?? false;

  const currencyList = useMemo(
    () => [...new Set(filteredAds?.map((ad) => ad.paymethod_currency))],
    [filteredAds],
  );

  const handleEnableTradeToggle = () => {
    updateTradeStatus({ [filterParams.cryptocurrency]: !isTradeEnabled });
  };

  const handleChangeFilter = (upd: Partial<UserAdsFilterParams>) => {
    const next = { ...filterParams, ...upd };

    setFilterParams(next);
    localStorage.setItem(USER_ADS_FILTER_KEY, JSON.stringify(next));
  };

  const handleRefresh = () => mutate();

  const ads = (
    <Box mt={{ mobile: '4x', tablet: isAdsEmpty ? '6x' : '10x' }}>
      <UserAdsList
        data={filteredAds}
        params={filterParams}
        isLoading={!filteredAds}
        isRefreshing={isValidating}
        onRefresh={handleRefresh}
      />
    </Box>
  );

  const alerts = (
    <UserAdsAlerts type={filterParams.type} cryptocurrency={filterParams.cryptocurrency} />
  );

  return (
    <Container maxWidth="fullhd">
      {isMobileDevice ? null : (
        <Box px="8x">
          <Breadcrumbs>
            <BreadcrumbsItem to={`/${lang}/p2p`}>{t('Market')}</BreadcrumbsItem>
            <BreadcrumbsItem>{t('My adverts')}</BreadcrumbsItem>
          </Breadcrumbs>
        </Box>
      )}

      <Box className={s.layoutWithoutSidebar} flexDirection="column" width="full">
        {isAdsEmpty ? null : (
          <Box
            px="5x"
            pt="2x"
            display="flex"
            justifyContent="flex-end"
            className={s.mobileControls}
          >
            <UserAdsEnableTradingSwitch
              isEnabled={isTradeEnabled}
              onChange={handleEnableTradeToggle}
            />
          </Box>
        )}

        <Box
          px="5x"
          py="6x"
          display="flex"
          justifyContent="space-between"
          gap="4x"
          className={s.mobileControls}
        >
          {isAdsEmpty ? (
            <Box />
          ) : (
            <Button as={Link} to={`/${lang}/p2p/adverts/create`}>
              {t('Create advert')}
            </Button>
          )}
          <UserAdsFilterMobile params={filterParams} onChange={handleChangeFilter} />
        </Box>
        <Box pb="4x" backgroundColor="block">
          <Box py="6x">
            <SelectCryptoCurrency
              value={filterParams.cryptocurrency}
              onChange={(v) => handleChangeFilter({ cryptocurrency: v })}
            />
          </Box>

          <Box px="5x">
            {isAdsEmpty ? null : (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Box py="2x" mr="2x">
                  <SetRate
                    type={filterParams.type}
                    cryptoCurrency={filterParams.cryptocurrency}
                    currencyList={currencyList}
                  />
                </Box>

                {isMobileDevice ? (
                  <Box py="2x">
                    <UserAdsTradingStatusSwitch
                      type={filterParams.type}
                      cryptocurrency={filterParams.cryptocurrency}
                      isEnabled={isAllEnabled}
                    />
                  </Box>
                ) : null}
              </Box>
            )}

            {alerts}
            {ads}
          </Box>
        </Box>
      </Box>

      <Box className={s.layoutWithSidebar} px="8x" pb="8x" alignItems="flex-start">
        <Box
          className={s.filter}
          flexShrink={0}
          p="6x"
          marginRight="6x"
          borderRadius="1.5x"
          backgroundColor="block"
        >
          <UserAdsFilter params={filterParams} onChange={handleChangeFilter} />
        </Box>
        <Box backgroundColor="block" pb="5x" borderRadius="1.5x" flexGrow={1}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py="4x"
            px="6x"
            borderBottomStyle="solid"
            borderBottomColor="modalHeaderBorderBottom"
            borderBottomWidth="1x"
          >
            <Text variant="title">{t('My adverts')}</Text>

            {isAdsEmpty ? null : (
              <UserAdsEnableTradingSwitch
                isEnabled={isTradeEnabled}
                onChange={handleEnableTradeToggle}
              />
            )}
          </Box>

          <Box px="6x">
            {isAdsEmpty ? null : (
              <Box display="flex" mt="6x" justifyContent="space-between">
                <SetRate
                  type={filterParams.type}
                  cryptoCurrency={filterParams.cryptocurrency}
                  currencyList={currencyList}
                />
                <Button as={Link} to={`/${lang}/p2p/adverts/create`}>
                  {t('Create advert')}
                </Button>
              </Box>
            )}

            {alerts}
            {ads}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
