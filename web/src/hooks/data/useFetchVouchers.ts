import { p2pUrl } from 'web/src/api';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { P2PVoucher, P2PVouchers } from 'web/src/modules/account/voucher-types';
import { useFetch } from './useFetch';

export const useFetchVouchers = (
  currency: string,
  cashed: boolean,
  page: number,
  items: number,
) => {
  return useFetch<P2PVouchers>(
    `${p2pUrl()}/vouchers/?${buildQueryString({
      currency,
      status: cashed ? 'cashed' : 'active',
      offset: page * items,
      limit: items,
    })}`,
    fetchWithCreds,
  );
};

export const useFetchMyVouchers = ({
  cryptocurrency,
  skip = 0,
  limit = 0,
  status = 'active',
}: {
  cryptocurrency?: string | undefined;
  skip: number;
  limit: number;
  status?: 'active' | 'cashed' | 'part';
}) => {
  return useFetch<P2PVouchers>(
    `${p2pUrl()}/vouchers/my/?${buildQueryString({
      cryptocurrency,
      skip,
      limit,
      status,
    })}`,
    fetchWithCreds,
  );
};

export const useFetchICashedVouchers = ({
  cryptocurrency,
  skip = 0,
  limit = 0,
}: {
  cryptocurrency?: string | undefined;
  skip: number;
  limit: number;
}) => {
  return useFetch<P2PVouchers>(
    `${p2pUrl()}/vouchers/icashed/?${buildQueryString({
      cryptocurrency,
      skip,
      limit,
    })}`,
    fetchWithCreds,
  );
};

export const useFetchVoucher = ({ code }: { code: P2PVoucher['deepLinkCode'] }) => {
  return useFetch<P2PVoucher>(`${p2pUrl()}/vouchers/${code}`, fetchWithCreds);
};
