import { FC, useState } from 'react';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/Container/Container';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Stack } from 'web/src/components/ui/Stack';
import { Pagination } from 'web/src/components/ui/Pagination';
import { UrlParams, getUrlSearchParams, setUrlSearchParams } from 'web/src/helpers/urlSearch';
import { TradesParams, useP2PTrades } from 'web/src/hooks/data/useFetchP2PTrades';
import { useAdapterContext } from '../Adapter';
import { TradesList } from './TradesList';

export const DEFAULT_FILTER: TradesParams = {
  onlyClosed: undefined,
  limit: 15,
  skip: 0,
};

export const URL_PARAMS: UrlParams<TradesParams> = {
  onlyClosed: {
    name: 'onlyClosed',
    set: (v) => (v === undefined ? undefined : `${v}`),
    get: (v) => (v === undefined ? undefined : Boolean(v)),
  },
  skip: { name: 'skip', set: (v) => `${v}`, get: (v) => Number(v) },
  limit: { name: 'limit', set: (v) => `${v}`, get: (v) => Number(v) },
};

export const Trades: FC = () => {
  const { t } = useAdapterContext();
  const { isMobileDevice } = useAppContext();
  const [filterParams, setFilterParams] = useState<TradesParams>(() => ({
    ...DEFAULT_FILTER,
    ...getUrlSearchParams(URL_PARAMS),
  }));
  const onlyClosedValues = [
    {
      title: t('All'),
      value: false,
    },
    {
      title: t('Active'),
      value: undefined,
    },
    {
      title: t('Closed'),
      value: true,
    },
  ];

  const { data, error, isValidating, mutate } = useP2PTrades(filterParams);

  const handleChangeFilter = (upd: Partial<TradesParams>) => {
    setFilterParams((prev) => ({ ...prev, ...upd }));
    setUrlSearchParams(upd, DEFAULT_FILTER, URL_PARAMS);
  };

  const handleChangePage = (value: number) => {
    handleChangeFilter({ skip: (value - 1) * filterParams.limit });
  };

  const handleChangePerPage = (value: number) => {
    handleChangeFilter({ limit: value, skip: 0 });
  };

  const handleRefresh = () => mutate();

  console.log({ data });

  if (error) {
    return null;
  }

  const stateFilters = (
    <Stack marginRight="4x">
      {onlyClosedValues.map(({ title, value }) => {
        return (
          <Button
            key={title}
            color="clarified"
            active={filterParams.onlyClosed === value}
            onClick={() => handleChangeFilter({ onlyClosed: value })}
          >
            {title}
          </Button>
        );
      })}
    </Stack>
  );

  const ads = (
    <>
      <TradesList data={data?.data} isLoading={isValidating} />

      {data && !isValidating && (
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

  if (isMobileDevice) {
    return (
      <Box display="flex" flexDirection="column" width="full">
        <Box m="5x" display="flex" flexDirection="column" gap="6x">
          {stateFilters}
          <Box display="flex" flexDirection="column" gap="4x">
            FILTER HERE
          </Box>
        </Box>
        <Box px="5x" py="4x" backgroundColor="dropdown">
          {ads}
        </Box>
      </Box>
    );
  }

  return (
    <Container maxWidth="fullhd">
      <Box display="flex" mt="8x" px="8x">
        {stateFilters}
      </Box>
      <Box display="flex" p="8x">
        <Box
          backgroundColor="dropdown"
          p="6x"
          borderRadius="1.5x"
          marginRight="6x"
          style={{ width: '20%', minWidth: '380px' }}
        >
          FILTER HERE
        </Box>
        <Box backgroundColor="dropdown" py="5x" px="6x" borderRadius="1.5x" flexGrow={1}>
          {ads}
        </Box>
      </Box>
    </Container>
  );
};
