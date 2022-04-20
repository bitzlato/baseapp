import { useDispatch } from 'react-redux';
import { useSWRConfig } from 'swr';
import { p2pUrl } from 'web/src/api/config';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { CurrencyRate, RateSourcesParams } from 'web/src/modules/p2p/types';
import { useFetch } from './useFetch';

export const useFetchRate = (cryptoCurrency: string, fiatCurrency: string | undefined) => {
  return useFetch<CurrencyRate>(
    fiatCurrency
      ? `${p2pUrl()}/profile/rate-sources/${cryptoCurrency}?${buildQueryString({
          currency: fiatCurrency,
        })}`
      : null,
    fetchWithCreds,
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
  const dispatch = useDispatch();
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
      alertFetchError(dispatch, error);
    }
  };
};
