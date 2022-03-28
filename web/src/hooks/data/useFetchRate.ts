import { p2pUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { CurrencyRate } from 'web/src/modules/user/profile/types';
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
