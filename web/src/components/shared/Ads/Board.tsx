import { FC, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/Container/Container';
import { Adapter } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Pagination } from 'web/src/components/ui/Pagination';
import { Stack } from 'web/src/components/ui/Stack';
import { useAds } from 'web/src/hooks/data/useFetchAds';
import { useFiatCurrencies } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { useT } from 'web/src/hooks/useT';
import { parseMappedHash, setMappedHash } from '../../../helpers/hash';
import { Ads } from './Ads';
import {
  DEFAULT_ACTION_TYPE,
  DEFAULT_CRYPTO_CODE,
  DEFAULT_FIAT_CODE,
  Filter,
  FilterValues,
} from './Filter';

interface Props {}

const mapForHash = {
  type: 'type',
  currency: 'c',
  cryptocurrency: 'cc',
  paymethod: 'method',
  isOwnerActive: (v: never) => ({
    key: 'active',
    toHash: () => (v ? 1 : undefined),
    fromHash: (x: never) => Boolean(+x),
  }),
  isOwnerTrusted: (v: never) => ({
    key: 'trusted',
    toHash: () => (v ? 1 : undefined),
    fromHash: (x: never) => Boolean(+x),
  }),
  isOwnerVerificated: (v: never) => ({
    key: 'verif',
    toHash: () => (v ? 1 : undefined),
    fromHash: (x: never) => Boolean(+x),
  }),
  amount: 'amount',
};

const ADS_PER_PAGE = 15;

export const Board: FC<Props> = () => {
  const t = useT();
  const { getFiatCurrency } = useFiatCurrencies();
  const { lang } = useAppContext();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(ADS_PER_PAGE);
  const [filterValues, setFilterValues] = useState<FilterValues>(() => {
    const initial = parseMappedHash(mapForHash);

    return {
      amount: undefined,
      type: DEFAULT_ACTION_TYPE,
      currency: DEFAULT_FIAT_CODE,
      cryptocurrency: DEFAULT_CRYPTO_CODE,
      isOwnerActive: false,
      isOwnerTrusted: false,
      isOwnerVerificated: false,
      paymethod: undefined,
      // override with values from hash store
      ...initial,
    };
  });

  const { data, error, isValidating, mutate } = useAds({
    limit: perPage,
    skip: (page - 1) * perPage,
    lang,
    ...filterValues,
  });

  const handleChangePage = (value: number) => setPage(value);
  const handleChangePerPage = (value: number) => setPerPage(value);
  const handleRefresh = () => mutate();
  const handleChangeFilter = useCallback((filter: FilterValues) => {
    setFilterValues(filter);
    setMappedHash(filter, mapForHash);
  }, []);

  const cryptoSign = filterValues.cryptocurrency;
  const [fiatSign, setFiatSign] = useState('');
  useEffect(() => {
    setFiatSign(getFiatCurrency(filterValues.currency).sign);
  }, [getFiatCurrency, filterValues]);

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
            <Filter initialValues={filterValues} onChange={handleChangeFilter} />
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
                perPage={perPage}
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
