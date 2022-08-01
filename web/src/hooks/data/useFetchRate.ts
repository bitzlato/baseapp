import { useSWRConfig } from 'swr';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { CurrencyRate, CurrencyRateByParams, RateSourcesParams } from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';

export const useFetchRate = (
  cryptoCurrency?: string | undefined,
  fiatCurrency?: string | undefined,
) => {
  return useFetch<CurrencyRate>(
    fiatCurrency && cryptoCurrency
      ? `${p2pUrl()}/profile/rate-sources/${cryptoCurrency}?${buildQueryString({
          currency: fiatCurrency,
        })}`
      : null,
    fetchWithCreds,
  );
};

interface CurrencyRateByParamsInput {
  currency?: string | undefined;
  percent?: string | number | undefined;
  value?: string | number | undefined;
}

export const useFetchRateByParams = (
  cryptoCurrency: string,
  input: CurrencyRateByParamsInput = {},
) => {
  return useFetch<CurrencyRateByParams>(
    input.currency && (input.value !== undefined || input.percent !== undefined)
      ? [`${p2pUrl()}/profile/rate-sources/${cryptoCurrency}`, input]
      : null,
    async (url: string, args: CurrencyRateByParamsInput) => {
      return fetchWithCreds(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args),
      });
    },
  );
};

export const useFetchRateSources = (cryptoCurrency: string, fiatCurrency: string | undefined) => {
  return useFetch<CurrencyRate[]>(
    fiatCurrency
      ? `${p2pUrl()}/public/refs/rate-sources?${buildQueryString({
          crypto: cryptoCurrency,
          currency: fiatCurrency,
        })}`
      : null,
    fetchWithCreds,
  );
};

export const useChangeRate = () => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();

  return async (params: RateSourcesParams): Promise<void> => {
    try {
      await fetchWithCreds(`${p2pUrl()}/profile/rate-sources/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      mutate(
        `${p2pUrl()}/profile/rate-sources/${params.cryptocurrency}?${buildQueryString({
          currency: params.currency,
        })}`,
      );
    } catch (error) {
      handleFetchError(error);
    }
  };
};
