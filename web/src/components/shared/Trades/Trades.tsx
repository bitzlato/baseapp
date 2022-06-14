import { FC, useState } from 'react';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/Container/Container';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { Stack } from 'web/src/components/ui/Stack';
import { Pagination } from 'web/src/components/ui/Pagination';
import { UrlParams, getUrlSearchParams, setUrlSearchParams } from 'web/src/helpers/urlSearch';
import { TradesParams, useFetchP2PTrades } from 'web/src/hooks/data/useFetchP2PTrades';
import { TradeType } from 'web/src/modules/p2p/trade.types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { TradesList } from 'web/src/components/shared/Trades/TradesList';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import { TradesFilter, TradesFilterMobile, DEFAULT_FILTER } from './TradesFilter';
import * as s from './Trades.css';

export const URL_PARAMS: UrlParams<TradesParams> = {
  onlyClosed: {
    name: 'onlyClosed',
    set: (v) => (v === undefined ? undefined : `${v}`),
    get: (v) => (v === undefined ? undefined : Boolean(v)),
  },
  paymethod: { name: 'paymethod', set: (v) => `${v}`, get: (v) => v },
  type: { name: 'type', set: (v) => `${v}`, get: (v) => v as TradeType },
  partner: { name: 'partner', set: (v) => `${v}`, get: (v) => v },
  tradeId: { name: 'tradeId', set: (v) => `${v}`, get: (v) => v },
  skip: { name: 'skip', set: (v) => `${v}`, get: (v) => Number(v) },
  limit: { name: 'limit', set: (v) => `${v}`, get: (v) => Number(v) },
};

export const Trades: FC = () => {
  const { t } = useAdapterContext();
  const { lang, isMobileDevice } = useAppContext();
  const [filterParams, setFilterParams] = useState<TradesParams>(() => ({
    ...DEFAULT_FILTER,
    ...getUrlSearchParams(URL_PARAMS),
  }));
  const onlyClosedValues = [
    // {
    //   title: t('All'),
    //   value: false,
    // },
    {
      label: t('Active'),
      value: undefined,
    },
    {
      label: t('Closed'),
      value: true,
    },
  ];

  const { data, error } = useFetchP2PTrades(filterParams, lang);

  const handleChangeFilter = (upd: Partial<TradesParams>) => {
    setFilterParams((prev) => ({ ...prev, ...upd }));
    setUrlSearchParams(upd, DEFAULT_FILTER, URL_PARAMS);
  };

  const handleChangePage = (value: number) => {
    const nextSkip = (value - 1) * filterParams.limit;

    if ((data?.total && nextSkip >= data.total) || nextSkip < 0) {
      return;
    }

    handleChangeFilter({ skip: nextSkip });
  };

  const handleChangePerPage = (value: number) => {
    handleChangeFilter({ limit: value, skip: 0 });
  };

  if (error) {
    return null;
  }

  const stateFilters = isMobileDevice ? (
    <VariantSwitcher
      name="tradeType"
      target="form"
      variants={onlyClosedValues}
      value={filterParams.onlyClosed}
      onChange={(value) => handleChangeFilter({ onlyClosed: value, skip: 0 })}
    />
  ) : (
    <Stack marginRight="4x">
      {onlyClosedValues.map(({ label, value }) => {
        return (
          <Button
            key={label}
            color="clarified"
            active={filterParams.onlyClosed === value}
            onClick={() => handleChangeFilter({ onlyClosed: value, skip: 0 })}
          >
            {label}
          </Button>
        );
      })}
    </Stack>
  );

  const trades = (
    <>
      <TradesList data={data?.data} isLoading={!data?.data} />

      {data && (
        <Pagination
          page={filterParams.skip / filterParams.limit + 1}
          total={data.total}
          perPage={filterParams.limit}
          onChange={handleChangePage}
          onChangePerPage={handleChangePerPage}
        />
      )}
    </>
  );

  return (
    <Container maxWidth="fullhd">
      <Box className={s.layoutWithoutSidebar} flexDirection="column" width="full">
        <Box
          px="5x"
          py="4x"
          display="flex"
          justifyContent="space-between"
          gap="4x"
          backgroundColor="headerBg"
        >
          {stateFilters}
          <TradesFilterMobile params={filterParams} onChange={handleChangeFilter} />
        </Box>
        <Box px="5x" py="4x" backgroundColor="block">
          {trades}
        </Box>
      </Box>

      <Box className={s.layoutWithSidebar} p="8x" alignItems="flex-start">
        <Box
          className={s.filter}
          flexShrink={0}
          p="6x"
          marginRight="6x"
          borderRadius="1.5x"
          backgroundColor="block"
        >
          <TradesFilter params={filterParams} onChange={handleChangeFilter} />
        </Box>
        <Box backgroundColor="block" pb="5x" borderRadius="1.5x" flexGrow={1}>
          <Box
            py="4x"
            px="6x"
            borderBottomStyle="solid"
            borderBottomColor="modalHeaderBorderBottom"
            borderBottomWidth="1x"
          >
            <Text variant="title">{t('My trades')}</Text>
          </Box>

          <Box px="6x">
            <Box display="flex" my="6x">
              {stateFilters}
            </Box>
            {trades}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
