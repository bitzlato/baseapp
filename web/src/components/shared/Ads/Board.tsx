import { FC, useEffect, useState } from 'react';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/Container/Container';
import { Box } from 'web/src/components/ui/Box';
import { Pagination } from 'web/src/components/ui/Pagination';
import { Spinner } from 'web/src/components/ui/Spinner';
import { UrlParams, getUrlSearchParams, setUrlSearchParams } from 'web/src/helpers/urlSearch';
import { useAds } from 'web/src/hooks/data/useFetchAds';
import { FiatCurrencies, useFiatCurrencies } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { useFetchP2PCryptoCurrencies } from 'web/src/hooks/data/useFetchP2PWallets';
import { AdvertParams, AdvertType, SeoAdvertType } from 'web/src/modules/p2p/types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { P2PCurrency } from 'web/src/modules/p2p/wallet-types';
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

const getFilterPathParams = (
  filter?: string,
): Pick<AdvertParams, 'type' | 'cryptocurrency' | 'currency'> | undefined => {
  const [
    seoType = 'buy',
    cryptocurrency = DEFAULT_FILTER.cryptocurrency,
    currency = DEFAULT_FILTER.currency,
  ] = filter?.split('-') ?? [];

  return filter
    ? {
        type: seoTypeToAd[seoType as SeoAdvertType] ?? DEFAULT_FILTER.type,
        cryptocurrency: cryptocurrency.toUpperCase(),
        currency: currency.toUpperCase(),
      }
    : undefined;
};

const generateFilterParamsUrl = (type: AdvertType, cryptocurrency: string, currency: string) => {
  return (
    `/board/${adTypeToSeo[type]}-${cryptocurrency}-${currency}`.toLowerCase() +
    window.location.search
  );
};

type BoardBodyProps = {
  fiatCurrencies: FiatCurrencies;
  cryptoCurrencies: P2PCurrency[];
};

const useBoardFilter = ({ fiatCurrencies, cryptoCurrencies }: BoardBodyProps) => {
  const { lang, user } = useAppContext();
  const {
    history,
    params: { filter },
  } = useAdapterContext<{ filter?: string }>();
  const [filterParams, setFilterParams] = useState<AdvertParams>(() => ({
    lang,
    ...DEFAULT_FILTER,
    ...(user?.bitzlato_user?.user_profile.currency
      ? { currency: user.bitzlato_user?.user_profile.currency }
      : undefined),
    ...getUrlSearchParams(URL_PARAMS),
    ...getFilterPathParams(filter),
  }));

  useEffect(() => {
    if (!filter) {
      history.replace(
        generateFilterParamsUrl(
          DEFAULT_FILTER.type,
          DEFAULT_FILTER.cryptocurrency,
          user?.bitzlato_user?.user_profile.currency ?? DEFAULT_FILTER.currency,
        ),
      );
    }
  }, [filter, history, user?.bitzlato_user?.user_profile.currency]);

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
    if (!cryptoCurrencies?.some((currency) => currency.code === filterParams.cryptocurrency)) {
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

  return { filterParams, handleChangeFilter };
};

export const BoardBody: FC<BoardBodyProps> = ({ fiatCurrencies, cryptoCurrencies }) => {
  const { isMobileDevice } = useAppContext();
  const { filterParams, handleChangeFilter } = useBoardFilter({ fiatCurrencies, cryptoCurrencies });
  const { data, error, isValidating, mutate } = useAds(filterParams);

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

  const ads = (
    <>
      <Ads
        data={data?.data}
        fiatSign={fiatCurrencies[filterParams.currency]?.sign ?? ''}
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
        <Box
          backgroundColor="headerBg"
          px="5x"
          py="4x"
          display="flex"
          flexDirection="column"
          gap="4x"
        >
          <FilterMobile params={filterParams} onChange={handleChangeFilter} />
        </Box>
        <Box px="5x" py="4x" backgroundColor="block">
          {ads}
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex" p="8x">
      <Box
        backgroundColor="block"
        p="6x"
        borderRadius="1.5x"
        marginRight="6x"
        style={{ width: '20%', minWidth: '380px' }}
      >
        <Filter params={filterParams} onChange={handleChangeFilter} />
      </Box>
      <Box backgroundColor="block" py="5x" px="6x" borderRadius="1.5x" flexGrow={1}>
        {ads}
      </Box>
    </Box>
  );
};

export const Board: FC = () => {
  const fiatCurrenciesValue = useFiatCurrencies();
  const cryptoCurrenciesValue = useFetchP2PCryptoCurrencies();
  const error = fiatCurrenciesValue.error ?? cryptoCurrenciesValue.error;

  if (error) {
    return null;
  }

  return (
    <Container maxWidth="fullhd">
      {fiatCurrenciesValue.fiatCurrencies === undefined ||
      cryptoCurrenciesValue.data === undefined ? (
        <Box display="flex" justifyContent="center" py="20x">
          <Spinner />
        </Box>
      ) : (
        <BoardBody
          fiatCurrencies={fiatCurrenciesValue.fiatCurrencies}
          cryptoCurrencies={cryptoCurrenciesValue.data}
        />
      )}
    </Container>
  );
};
