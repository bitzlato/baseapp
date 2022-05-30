import { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/Container/Container';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Pagination } from 'web/src/components/ui/Pagination';
import { Stack } from 'web/src/components/ui/Stack';
import { UrlParams, getUrlSearchParams, setUrlSearchParams } from 'web/src/helpers/urlSearch';
import { useAds } from 'web/src/hooks/data/useFetchAds';
import { useFiatCurrencies } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { useFetchP2PCryptoCurrencies } from 'web/src/hooks/data/useFetchP2PWallets';
import { useT } from 'web/src/hooks/useT';
import { AdvertParams, AdvertType, SeoAdvertType } from 'web/src/modules/p2p/types';
import { Ads } from './Ads';
import { DEFAULT_FILTER, Filter, FilterMobile } from './Filter';

export const URL_PARAMS: UrlParams<
  Omit<AdvertParams, 'lang' | 'type' | 'cryptocurrency' | 'currency'>
> = {
  amount: { name: 'amount', set: (v) => v, get: (v) => v },
  amountType: { name: 'amountType', set: (v) => v, get: (v) => v as AdvertParams['amountType'] },
  paymethod: { name: 'method', set: (v) => `${v}`, get: (v) => Number(v) },
  skip: { name: 'skip', set: (v) => `${v}`, get: (v) => Number(v) },
  limit: { name: 'limit', set: (v) => `${v}`, get: (v) => Number(v) },
  isOwnerActive: { name: 'active', set: (v) => `${v}`, get: (v) => Boolean(v) },
  isOwnerTrusted: { name: 'trusted', set: (v) => `${v}`, get: (v) => Boolean(v) },
  isOwnerVerificated: { name: 'verif', set: (v) => `${v}`, get: (v) => Boolean(v) },
};

export const adTypeToSeo: Record<AdvertType, SeoAdvertType> = {
  purchase: 'buy',
  selling: 'sell',
};

export const seoTypeToAd: Record<SeoAdvertType, AdvertType> = {
  buy: 'purchase',
  sell: 'selling',
};

const isSeoType = (type: string | undefined): type is SeoAdvertType => {
  return type === 'buy' || type === 'sell';
};

const getFilterPathParams = (
  filter?: string,
): Pick<AdvertParams, 'type' | 'cryptocurrency' | 'currency'> => {
  const [seoType, cryptocurrency, currency] = filter?.split('-') ?? [];

  return {
    type: isSeoType(seoType) ? seoTypeToAd[seoType] : DEFAULT_FILTER.type,
    cryptocurrency: cryptocurrency?.toUpperCase() ?? DEFAULT_FILTER.cryptocurrency,
    currency: currency?.toUpperCase() ?? DEFAULT_FILTER.currency,
  };
};

const generateFilterParamsUrl = (type: AdvertType, cryptocurrency: string, currency: string) => {
  return (
    `/board/${adTypeToSeo[type]}-${cryptocurrency}-${currency}`.toLowerCase() +
    window.location.search
  );
};

export const Board: FC = () => {
  const t = useT();
  const history = useHistory();
  const { filter } = useParams<{ filter?: string }>();
  const { getFiatCurrency, fiatCurrencies } = useFiatCurrencies();
  const { data: cryptoCurrencies = [] } = useFetchP2PCryptoCurrencies();
  const { lang, isMobileDevice } = useAppContext();
  const [filterParams, setFilterParams] = useState<AdvertParams>(() => ({
    lang,
    ...DEFAULT_FILTER,
    ...getUrlSearchParams(URL_PARAMS),
    ...getFilterPathParams(filter),
  }));

  const { data, error, isValidating, mutate } = useAds(filterParams);

  useEffect(() => {
    if (!filter) {
      history.replace(
        generateFilterParamsUrl(
          DEFAULT_FILTER.type,
          DEFAULT_FILTER.cryptocurrency,
          DEFAULT_FILTER.currency,
        ),
      );
    }
  }, [filter, history]);

  const handleChangeFilter = (upd: Partial<AdvertParams>) => {
    setFilterParams((prev) => ({ ...prev, ...upd }));
    setUrlSearchParams(upd, DEFAULT_FILTER, URL_PARAMS);

    if (upd.type || upd.cryptocurrency || upd.currency) {
      history.push(
        generateFilterParamsUrl(
          upd.type ?? filterParams.type,
          upd.cryptocurrency ?? filterParams.cryptocurrency,
          upd.currency ?? filterParams.currency,
        ),
      );
    }
  };

  useEffect(() => {
    if (!cryptoCurrencies.some((currency) => currency.code === filterParams.cryptocurrency)) {
      handleChangeFilter({ cryptocurrency: DEFAULT_FILTER.cryptocurrency, paymethod: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams.cryptocurrency, cryptoCurrencies]);

  useEffect(() => {
    if (!Object.keys(fiatCurrencies).includes(filterParams.currency)) {
      handleChangeFilter({ currency: DEFAULT_FILTER.currency, paymethod: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams.currency, fiatCurrencies]);

  const handleChangePage = (value: number) => {
    handleChangeFilter({ skip: (value - 1) * filterParams.limit });
  };

  const handleChangePerPage = (value: number) => {
    handleChangeFilter({ limit: value, skip: 0 });
  };

  const handleRefresh = () => mutate();

  if (error) {
    return null;
  }

  const navs = (
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
  );

  const ads = (
    <>
      <Ads
        data={data?.data}
        fiatSign={getFiatCurrency(filterParams.currency).sign}
        cryptoSign={filterParams.cryptocurrency}
        isLoading={isValidating}
        onRefresh={handleRefresh}
      />
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
          {navs}
          <Box display="flex" flexDirection="column" gap="4x">
            <FilterMobile params={filterParams} onChange={handleChangeFilter} />
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
        {navs}
      </Box>
      <Box display="flex" p="8x">
        <Box
          backgroundColor="dropdown"
          p="6x"
          borderRadius="1.5x"
          marginRight="6x"
          style={{ width: '20%', minWidth: '380px' }}
        >
          <Filter params={filterParams} onChange={handleChangeFilter} />
        </Box>
        <Box backgroundColor="dropdown" py="5x" px="6x" borderRadius="1.5x" flexGrow={1}>
          {ads}
        </Box>
      </Box>
    </Container>
  );
};
