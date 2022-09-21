import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { P2PWithdrawInfo, P2PWithdrawVoucherCount } from 'web/src/modules/p2p/withdrawal';

export const useFetchP2PWithdrawalInfo = ({
  cryptocurrency,
  amount,
  voucher,
  blockchainId,
}: {
  cryptocurrency: string;
  amount: string;
  voucher: boolean;
  blockchainId?: number | undefined;
}) =>
  useFetch<P2PWithdrawInfo>(
    `${p2pUrl()}/wallets/${cryptocurrency}/withdrawal?${buildQueryString({
      amount,
      voucher,
      blockchainId,
    })}`,
    fetchWithCreds,
  );

export const useFetchP2PWithdrawVouchers = () =>
  useFetch<P2PWithdrawVoucherCount>(`${p2pUrl()}/withdraw-vouchers-count`, fetchWithCreds);
