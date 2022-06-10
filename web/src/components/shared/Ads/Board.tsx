import { FC, useCallback, useEffect, useState } from 'react';
import { useAppContext, useUser } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/Container/Container';
import { Box } from 'web/src/components/ui/Box';
import { Pagination } from 'web/src/components/ui/Pagination';
import { Spinner } from 'web/src/components/ui/Spinner';
import { UrlParams, getUrlSearchParams, setUrlSearchParams } from 'web/src/helpers/urlSearch';
import { useAds } from 'web/src/hooks/data/useFetchAds';
import { FiatCurrencies, useFiatCurrencies } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { useFetchP2PCryptoCurrencies } from 'web/src/hooks/data/useFetchP2PWallets';
import { AdvertParams, AdvertType, PaymethodInfo, SeoAdvertType } from 'web/src/modules/p2p/types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { P2PCurrency } from 'web/src/modules/p2p/wallet-types';
import { Language } from 'web/src/types';
import { useFetchPaymethods } from 'web/src/hooks/data/useFetchPaymethods';
import { useFetchP2PLastFilter } from 'web/src/hooks/data/useFetchP2PLastFilter';
import { useP2PSetLastFilter } from 'web/src/hooks/mutations/useP2PSetLastFilter';
import { pick } from 'web/src/helpers/pick';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { Ads } from './Ads';
import { DEFAULT_FILTER, Filter, FilterMobile } from './Filter';
import * as s from './Board.css';

export const URL_PARAMS: UrlParams<
  Omit<AdvertParams, 'lang' | 'type' | 'cryptocurrency' | 'currency'>
> = {
  amount: { name: 'amount', set: (v) => v, get: (v) => v },
  amountType: { name: 'amountType', set: (v) => v, get: (v) => v as AdvertParams['amountType'] },
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

type FilterPathParams = Partial<Pick<AdvertParams, 'type' | 'cryptocurrency' | 'currency'>>;
const getFilterPathParams = (filter?: string): FilterPathParams | undefined => {
  if (!filter) {
    return undefined;
  }

  const [seoType = 'buy', cryptocurrency, currency] = filter?.split('-') ?? [];
  const params: FilterPathParams = {};
  const type = seoTypeToAd[seoType as SeoAdvertType];
  if (type) {
    params.type = type;
  }

  if (cryptocurrency) {
    params.cryptocurrency = cryptocurrency.toUpperCase();
  }

  if (currency) {
    params.currency = currency.toUpperCase();
  }

  return params;
};

const generateFilterParamsUrl = (
  lang: Language,
  type: AdvertType,
  cryptocurrency: string,
  currency: string,
  paymethod?: PaymethodInfo | undefined,
  query: string = window.location.search,
) => {
  const maybePaymethodSlug = paymethod ? `-${paymethod.slug}` : '';

  return (
    `/${lang}/p2p/${adTypeToSeo[type]}-${cryptocurrency}-${currency}${maybePaymethodSlug}`.toLowerCase() +
    query
  );
};

const ADVERT_PARAMS_IN_QUERY = [
  'amount',
  'amountType',
  'skip',
  'limit',
  'isOwnerActive',
  'isOwnerTrusted',
  'isOwnerVerificated',
] as const;
const ADVERT_PARAMS_IN_LAST_FILTER = [
  'type',
  'currency',
  'cryptocurrency',
  'isOwnerVerificated',
  'isOwnerTrusted',
  'isOwnerActive',
  'paymethod',
  'amount',
  'amountType',
] as const;
const getFilterParamsFromLastFilter = (lastFilter: any): Partial<AdvertParams> | undefined => {
  if (typeof lastFilter !== 'object' || lastFilter === null) {
    return undefined;
  }

  return pick(lastFilter, ADVERT_PARAMS_IN_LAST_FILTER);
};

type BoardBodyProps = {
  fiatCurrencies: FiatCurrencies;
  cryptoCurrencies: P2PCurrency[];
  lastFilter?: Partial<AdvertParams> | undefined;
};

const useBoardFilter = ({ fiatCurrencies, cryptoCurrencies, lastFilter }: BoardBodyProps) => {
  const { lang, user } = useAppContext();
  const {
    history,
    params: { filter },
  } = useAdapterContext<{ filter?: string }>();
  const [filterParams, setFilterParams] = useState<AdvertParams>(() => {
    const byLocation = {
      ...getUrlSearchParams(URL_PARAMS),
      ...getFilterPathParams(filter),
    };
    const byLastFilter = getFilterParamsFromLastFilter(lastFilter);
    const params = Object.keys(byLocation).length > 0 ? byLocation : byLastFilter;

    return {
      lang,
      ...DEFAULT_FILTER,
      ...(user?.bitzlato_user?.user_profile.currency
        ? { currency: user.bitzlato_user.user_profile.currency }
        : undefined),
      ...params,
    };
  });
  const { data: { data: paymethods } = {} } = useFetchPaymethods(filterParams);
  const [setLatsFilter] = useP2PSetLastFilter();

  useEffect(() => {
    if (!filter) {
      history.replace(
        generateFilterParamsUrl(
          lang,
          filterParams.type,
          filterParams.cryptocurrency,
          filterParams.currency,
          filterParams.paymethod
            ? paymethods?.find((paymethod) => paymethod.id === filterParams.paymethod)
            : undefined,
          buildQueryString(pick(filterParams, ADVERT_PARAMS_IN_QUERY)),
        ),
      );
    }
  }, [filter, filterParams, history, lang, paymethods]);

  const handleChangeFilter = useCallback(
    (upd: Partial<AdvertParams>) => {
      setFilterParams((prev) => ({ ...prev, ...upd, skip: 0 }));
      setUrlSearchParams(upd, DEFAULT_FILTER, URL_PARAMS);
      if (upd.type || upd.cryptocurrency || upd.currency || upd.paymethod) {
        history.push(
          generateFilterParamsUrl(
            lang,
            upd.type ?? filterParams.type,
            upd.cryptocurrency ?? filterParams.cryptocurrency,
            upd.currency ?? filterParams.currency,
            upd.paymethod
              ? paymethods?.find((paymethod) => paymethod.id === upd.paymethod)
              : undefined,
          ),
        );
      }
    },
    [
      filterParams.cryptocurrency,
      filterParams.currency,
      filterParams.type,
      history,
      lang,
      paymethods,
    ],
  );

  // Effect of handling slug paymethod changes from current location
  useEffect(() => {
    if (!filter || !paymethods) {
      return;
    }

    const paymethodSlug = filter.match(/[\w]+-[\w]+-[\w]+-(.*)/i)?.[1] ?? undefined;
    if (!paymethodSlug) {
      return;
    }

    const paymethod = paymethods.find((item) => item.slug === paymethodSlug);
    if (!paymethod) {
      return;
    }

    handleChangeFilter({ paymethod: paymethod.id });
  }, [filter, handleChangeFilter, paymethods]);

  useEffect(() => {
    if (!cryptoCurrencies?.some((currency) => currency.code === filterParams.cryptocurrency)) {
      handleChangeFilter({ cryptocurrency: DEFAULT_FILTER.cryptocurrency, paymethod: undefined });
    }
  }, [filterParams.cryptocurrency, cryptoCurrencies, handleChangeFilter]);

  useEffect(() => {
    if (fiatCurrencies[filterParams.currency] === undefined) {
      handleChangeFilter({ currency: DEFAULT_FILTER.currency, paymethod: undefined });
    }
  }, [filterParams.currency, fiatCurrencies, handleChangeFilter]);

  // Save filter params to backend
  useEffect(() => {
    if (user) {
      setLatsFilter(pick(filterParams, ADVERT_PARAMS_IN_LAST_FILTER));
    }
  }, [filterParams, setLatsFilter, user]);

  return { filterParams, handleChangeFilter };
};

export const BoardBody: FC<BoardBodyProps> = ({ fiatCurrencies, cryptoCurrencies, lastFilter }) => {
  const { filterParams, handleChangeFilter } = useBoardFilter({
    fiatCurrencies,
    cryptoCurrencies,
    lastFilter,
  });
  const { data, error, mutate, isValidating } = useAds(filterParams);

  const handleChangePage = (value: number) => {
    handleChangeFilter({ skip: (value - 1) * filterParams.limit });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
        isLoading={!data?.data}
        isRefreshing={isValidating}
        onRefresh={handleRefresh}
      />
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
    <>
      <Box className={s.layoutWithoutSidebar} flexDirection="column" width="full">
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
      <Box className={s.layoutWithSidebar} p="8x" width="full" alignItems="flex-start">
        <Box
          className={s.filter}
          backgroundColor="block"
          p="6x"
          borderRadius="1.5x"
          marginRight="6x"
        >
          <Filter params={filterParams} onChange={handleChangeFilter} />
        </Box>
        <Box backgroundColor="block" py="5x" px="6x" borderRadius="1.5x" flexGrow={1}>
          {ads}
        </Box>
      </Box>
    </>
  );
};

export const Board: FC = () => {
  const user = useUser();
  const fiatCurrenciesValue = useFiatCurrencies();
  const cryptoCurrenciesValue = useFetchP2PCryptoCurrencies();
  const lastFilterValue = useFetchP2PLastFilter();
  const error = fiatCurrenciesValue.error ?? cryptoCurrenciesValue.error ?? lastFilterValue.error;

  if (error) {
    return null;
  }

  return (
    <Container maxWidth="fullhd">
      {fiatCurrenciesValue.fiatCurrencies === undefined ||
      cryptoCurrenciesValue.data === undefined ||
      (lastFilterValue.data === undefined && user) ? (
        <Box display="flex" justifyContent="center" py="20x" width="full">
          <Spinner />
        </Box>
      ) : (
        <BoardBody
          fiatCurrencies={fiatCurrenciesValue.fiatCurrencies}
          cryptoCurrencies={cryptoCurrenciesValue.data}
          lastFilter={lastFilterValue.data}
        />
      )}
    </Container>
  );
};
