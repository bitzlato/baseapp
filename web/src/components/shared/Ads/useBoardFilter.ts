import { useCallback, useEffect, useState } from 'react';
import { useAppContext } from 'web/src/components/app/AppContext';
import {
  UrlParams,
  getUrlSearchParams,
  setUrlSearchParams,
  buildUrlSearch,
} from 'web/src/helpers/urlSearch';
import { AdvertParams, AdvertType, SeoAdvertType } from 'web/src/modules/p2p/types';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { P2PCryptoCurrencySource } from 'web/src/modules/p2p/wallet-types';
import { Language } from 'web/src/types';
import { useFetchPaymethods } from 'web/src/hooks/data/useFetchPaymethods';
import { useP2PSetLastFilter } from 'web/src/hooks/mutations/useP2PSetLastFilter';
import { pick } from 'web/src/helpers/pick';
import { P2PFiatCurrencies } from 'web/src/types/currencies.types';
import { DEFAULT_FILTER } from './Filter';

export const URL_PARAMS: UrlParams<Pick<AdvertParams, 'skip' | 'limit'>> = {
  skip: { name: 'skip', set: (v) => `${v}`, get: (v) => Number(v) },
  limit: { name: 'limit', set: (v) => `${v}`, get: (v) => Number(v) },
};

export const adTypeToSeo: Record<AdvertType, SeoAdvertType> = {
  purchase: 'buy',
  selling: 'sell',
};

export const seoTypeToAd: Record<SeoAdvertType, AdvertType> = {
  buy: 'purchase',
  sell: 'selling',
};

type FilterPathParams = Partial<
  Pick<AdvertParams, 'type' | 'cryptocurrency' | 'currency' | 'paymethodSlug'>
>;
const getFilterPathParams = (filter?: string): FilterPathParams | undefined => {
  if (!filter) {
    return undefined;
  }

  const [seoType = 'buy', cryptocurrency, currency, paymethodSlug] = filter?.split('-') ?? [];
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

  if (paymethodSlug) {
    params.paymethodSlug = paymethodSlug;
  }

  return params;
};

const generateFilterParamsUrl = (
  lang: Language,
  type: AdvertType,
  cryptocurrency: string,
  currency: string,
  paymethodSlug?: string | undefined,
  query: string = window.location.search,
) => {
  const maybePaymethodSlug = paymethodSlug ? `-${paymethodSlug}` : '';

  return (
    `/${lang}/p2p/${adTypeToSeo[type]}-${cryptocurrency}-${currency}${maybePaymethodSlug}`.toLowerCase() +
    query
  );
};

const ADVERT_PARAMS_IN_QUERY = ['skip', 'limit'] as const;
const ADVERT_PARAMS_IN_LAST_FILTER = [
  'type',
  'currency',
  'cryptocurrency',
  'isOwnerVerificated',
  'isOwnerTrusted',
  'isOwnerActive',
  'paymethod',
  'paymethodSlug',
  'amount',
  'amountType',
] as const;
const getFilterParamsFromLastFilter = (): Partial<AdvertParams> | undefined => {
  if (typeof lastFilter !== 'object' || lastFilter === null) {
    return undefined;
  }

  const filterParams = {
    ...lastFilter,
  };

  if ('paymethod' in lastFilter && typeof lastFilter.paymethod === 'object') {
    if (
      lastFilter.paymethod !== null &&
      'value' in lastFilter.paymethod &&
      typeof lastFilter.paymethod.value === 'number'
    ) {
      // old format "paymethod":{"title":"Сбербанк","value":3547}
      filterParams.paymethod = lastFilter.paymethod.value;
    } else {
      filterParams.paymethod = undefined;
    }
  }

  if ('amount' in filterParams && !filterParams.amount && 'amountType' in filterParams) {
    filterParams.amount = undefined;
    filterParams.amountType = undefined;
  }

  return pick(filterParams, ADVERT_PARAMS_IN_LAST_FILTER);
};

type UseBoardFilterArg = {
  fiatCurrencies: P2PFiatCurrencies;
  cryptoCurrencies: P2PCryptoCurrencySource[];
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
    const params = {
      ...byLocation,
      ...byLastFilter,
    };

    return {
      lang,
      ...DEFAULT_FILTER,
      ...(user?.bitzlato_user?.user_profile.currency
        ? { currency: user.bitzlato_user.user_profile.currency }
        : undefined),
      ...params,
    };
  });
  const { data: { data: paymethods } = {} } = useFetchPaymethods({
    lang: filterParams.lang,
    type: filterParams.type,
    currency: filterParams.currency,
    cryptocurrency: filterParams.cryptocurrency,
    isOwnerActive: filterParams.isOwnerActive,
    isOwnerTrusted: filterParams.isOwnerTrusted,
    isOwnerVerificated: filterParams.isOwnerVerificated,
  });
  const [setLatsFilter] = useP2PSetLastFilter();

  const handleChangeFilter = useCallback(
    (_upd: Partial<AdvertParams>) => {
      const upd = {
        skip: 0,
        ..._upd,
      };

      const next = {
        ...filterParams,
        ...upd,
      };

      let paymethod;
      if ('paymethod' in upd) {
        paymethod = upd.paymethod
          ? paymethods?.find((item) => item.id === upd.paymethod)
          : undefined;

        next.paymethodSlug = paymethod?.slug ?? undefined;
      }

      setFilterParams(next);

      // Save filter params to backend
      if (user) {
        setLatsFilter(pick(next, ADVERT_PARAMS_IN_LAST_FILTER));
      }

      setUrlSearchParams(upd, DEFAULT_FILTER, URL_PARAMS);
      if (upd.type || upd.cryptocurrency || upd.currency || paymethod) {
        history.push(
          generateFilterParamsUrl(
            lang,
            upd.type ?? filterParams.type,
            upd.cryptocurrency ?? filterParams.cryptocurrency,
            upd.currency ?? filterParams.currency,
            paymethod?.slug,
          ),
        );
      }
    },
    [filterParams, history, lang, paymethods, setLatsFilter, user],
  );

  // Set default filter or sync paymethod slug with location
  useEffect(() => {
    let { paymethodSlug } = filterParams;
    if (!paymethodSlug && filterParams.paymethod) {
      paymethodSlug = paymethods?.find(
        (paymethod) => paymethod.id === filterParams.paymethod,
      )?.slug;
    }

    history.replace(
      generateFilterParamsUrl(
        lang,
        filterParams.type,
        filterParams.cryptocurrency,
        filterParams.currency,
        paymethodSlug,
        buildUrlSearch(pick(filterParams, ADVERT_PARAMS_IN_QUERY), DEFAULT_FILTER, URL_PARAMS),
      ),
    );
  }, [filter, filterParams, handleChangeFilter, history, lang, paymethods]);

  useEffect(() => {
    if (
      paymethods &&
      paymethods.length > 0 &&
      !filterParams.paymethod &&
      filterParams.paymethodSlug
    ) {
      handleChangeFilter({
        paymethod: paymethods?.find((paymethod) => paymethod.slug === filterParams.paymethodSlug)
          ?.id,
      });
    }
  }, [filterParams, paymethods, handleChangeFilter]);

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

  return { filterParams, handleChangeFilter };
};
