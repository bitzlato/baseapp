import { FC, Reducer, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/Container/Container';
import { Adapter } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Pagination } from 'web/src/components/ui/Pagination';
import { Stack } from 'web/src/components/ui/Stack';
import { ConvertTmpl, getUrlSearch, setUrlSearch } from 'web/src/helpers/urlSearch';
import { useAds } from 'web/src/hooks/data/useFetchAds';
import { useFiatCurrencies } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { useT } from 'web/src/hooks/useT';
import { AdvertParams, AdvertType } from 'web/src/modules/p2p/types';
import { Ads } from './Ads';
import { Filter } from './Filter';

function reducer(params: AdvertParams, upd: Partial<AdvertParams>): AdvertParams {
  return { ...params, ...upd };
}

export const CONVERT: ConvertTmpl<Omit<AdvertParams, 'limit' | 'skip' | 'lang'>> = {
  type: {
    name: 'type',
    set: (v) => v,
    get: (v) => v as AdvertType,
  },
  currency: {
    name: 'c',
    set: (v) => v,
    get: (v) => v,
  },
  cryptocurrency: {
    name: 'cc',
    set: (v) => v,
    get: (v) => v,
  },
  paymethod: {
    name: 'method',
    set: (v) => `${v}`,
    get: (v) => Number(v),
  },
  amount: {
    name: 'amount',
    set: (v) => v,
    get: (v) => v,
  },
  isOwnerActive: {
    name: 'active',
    set: (v) => (v ? '1' : undefined),
    get: (v) => v === '1',
  },
  isOwnerTrusted: {
    name: 'trusted',
    set: (v) => (v ? '1' : undefined),
    get: (v) => v === '1',
  },
  isOwnerVerificated: {
    name: 'verif',
    set: (v) => (v ? '1' : undefined),
    get: (v) => v === '1',
  },
};

const ADS_PER_PAGE = 15;

const DEFAULT_FILTER: Omit<AdvertParams, 'lang'> = {
  limit: ADS_PER_PAGE,
  skip: 0,
  type: 'purchase',
  currency: 'RUB',
  cryptocurrency: 'BTC',
  isOwnerVerificated: false,
  isOwnerTrusted: false,
  isOwnerActive: false,
};

export const Board: FC = () => {
  const t = useT();
  const { getFiatCurrency } = useFiatCurrencies();
  const { lang } = useAppContext();
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useReducer<Reducer<AdvertParams, Partial<AdvertParams>>, void>(
    reducer,
    undefined,
    () => ({
      lang,
      ...DEFAULT_FILTER,
      ...getUrlSearch(CONVERT),
    }),
  );

  const { data, error, isValidating, mutate } = useAds(filter);

  const handleChangeFilter = (upd: Partial<AdvertParams>) => {
    setFilter(upd);
    setUrlSearch(CONVERT, upd, DEFAULT_FILTER);
  };

  const handleChangePage = (value: number) => {
    setPage(value);
    handleChangeFilter({ skip: (value - 1) * filter.limit });
  };

  const handleChangePerPage = (value: number) => handleChangeFilter({ limit: value });

  const handleRefresh = () => mutate();

  const cryptoSign = filter.cryptocurrency;
  const fiatSign = getFiatCurrency(filter.currency).sign;

  if (error) {
    return null;
  }

  return (
    <Adapter Link={Link}>
      <Container maxWidth="fullhd">
        <Box display="flex" justifyContent="space-between" mt="8x" px="8x">
          <Stack marginRight="4x">
            <Button as={Link} to="/" color="clarified" active>
              {t('AD Board')}
            </Button>
            <Button as={Link} to="/" color="clarified">
              {t('My adverts')}
            </Button>
            <Button as={Link} to="/" color="clarified">
              {t('My trades')}
            </Button>
          </Stack>
        </Box>
        <Box display="flex" p="8x">
          <Box
            backgroundColor="dropdown"
            p="6x"
            borderRadius="1.5x"
            marginRight="6x"
            style={{ width: '20%', minWidth: '380px' }}
          >
            <Filter values={filter} onChange={handleChangeFilter} />
          </Box>
          <Box backgroundColor="dropdown" py="5x" px="6x" borderRadius="1.5x" flexGrow={1}>
            <Ads
              data={data?.data}
              fiatSign={fiatSign}
              cryptoSign={cryptoSign}
              isLoading={isValidating}
              onRefresh={handleRefresh}
            />
            {data && !isValidating && (
              <Pagination
                page={page}
                total={data.total}
                perPage={filter.limit}
                onChange={handleChangePage}
                onChangePerPage={handleChangePerPage}
              />
            )}
          </Box>
        </Box>
      </Container>
    </Adapter>
  );
};
