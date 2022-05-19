import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/Container/Container';
import { Adapter } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Pagination } from 'web/src/components/ui/Pagination';
import { Stack } from 'web/src/components/ui/Stack';
import { UrlParams, getUrlSearchParams, setUrlSearchParams } from 'web/src/helpers/urlSearch';
import { useAds } from 'web/src/hooks/data/useFetchAds';
import { useFiatCurrencies } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { useT } from 'web/src/hooks/useT';
import { AdvertParams } from 'web/src/modules/p2p/types';
import { Ads } from './Ads';
import { DEFAULT_FILTER, Filter } from './Filter';

export const URL_PARAMS: UrlParams<Omit<AdvertParams, 'lang'>> = {
  type: { name: 'type', set: (v) => v, get: (v) => v },
  currency: { name: 'c', set: (v) => v, get: (v) => v },
  cryptocurrency: { name: 'cc', set: (v) => v, get: (v) => v },
  amount: { name: 'amount', set: (v) => v, get: (v) => v },
  paymethod: { name: 'method', set: (v) => `${v}`, get: (v) => Number(v) },
  skip: { name: 'skip', set: (v) => `${v}`, get: (v) => Number(v) },
  limit: { name: 'limit', set: (v) => `${v}`, get: (v) => Number(v) },
  isOwnerActive: { name: 'active', set: (v) => `${v}`, get: (v) => Boolean(v) },
  isOwnerTrusted: { name: 'trusted', set: (v) => `${v}`, get: (v) => Boolean(v) },
  isOwnerVerificated: { name: 'verif', set: (v) => `${v}`, get: (v) => Boolean(v) },
};

export const Board: FC = () => {
  const t = useT();
  const { getFiatCurrency } = useFiatCurrencies();
  const { lang } = useAppContext();

  const [filter, setFilter] = useState<AdvertParams>(() => ({
    lang,
    ...DEFAULT_FILTER,
    ...getUrlSearchParams(URL_PARAMS),
  }));

  const { data, error, isValidating, mutate } = useAds(filter);

  const handleChangeFilter = (upd: Partial<AdvertParams>) => {
    setFilter((prev) => ({ ...prev, ...upd }));
    setUrlSearchParams(upd, DEFAULT_FILTER, URL_PARAMS);
  };

  const handleChangePage = (value: number) => {
    handleChangeFilter({ skip: (value - 1) * filter.limit });
  };

  const handleChangePerPage = (value: number) => {
    handleChangeFilter({ limit: value, skip: 0 });
  };

  const handleRefresh = () => mutate();

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
            <Filter params={filter} onChange={handleChangeFilter} />
          </Box>
          <Box backgroundColor="dropdown" py="5x" px="6x" borderRadius="1.5x" flexGrow={1}>
            <Ads
              data={data?.data}
              fiatSign={getFiatCurrency(filter.currency).sign}
              cryptoSign={filter.cryptocurrency}
              isLoading={isValidating}
              onRefresh={handleRefresh}
            />
            {data && !isValidating && (
              <Pagination
                page={filter.skip / filter.limit + 1}
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
