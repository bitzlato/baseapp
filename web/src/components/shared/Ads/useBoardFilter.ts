import { useCallback, useEffect, useState } from 'react';
import { useAppContext } from 'web/src/components/app/AppContext';
import { UrlParams, getUrlSearchParams, setUrlSearchParams } from 'web/src/helpers/urlSearch';
import { FiatCurrencies } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { AdvertParams, AdvertType, PaymethodInfo, SeoAdvertType } from 'web/src/modules/p2p/types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { P2PCurrency } from 'web/src/modules/p2p/wallet-types';
import { Language } from 'web/src/types';
import { useFetchPaymethods } from 'web/src/hooks/data/useFetchPaymethods';
import { useP2PSetLastFilter } from 'web/src/hooks/mutations/useP2PSetLastFilter';
import { pick } from 'web/src/helpers/pick';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { DEFAULT_FILTER } from './Filter';

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

type UseBoardFilterArg = {
  fiatCurrencies: FiatCurrencies;
  cryptoCurrencies: P2PCurrency[];
  lastFilter?: Partial<AdvertParams> | undefined;
};

export const useBoardFilter = ({
  fiatCurrencies,
  cryptoCurrencies,
  lastFilter,
}: UseBoardFilterArg) => {
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
