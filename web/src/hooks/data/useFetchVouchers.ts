import { accountUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { AccountVoucher } from 'web/src/modules/account/voucher-types';
import { useFetch } from './useFetch';

export const useFetchVouchers = (
  currency: string,
  cashed: boolean,
  page: number,
  items: number,
) => {
  return useFetch<AccountVoucher[]>(
    `${accountUrl()}/vouchers?${buildQueryString({
      currency,
      cashed,
      page,
      items,
    })}`,
    fetchWithCreds,
  );
};
