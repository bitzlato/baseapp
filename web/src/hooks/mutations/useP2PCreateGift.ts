import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { accountUrl, p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import {
  P2PConfirmation,
  P2PVoucher,
  P2VoucherPostParams,
} from 'web/src/modules/account/voucher-types';

type Input = {
  params: P2VoucherPostParams;
  twoFACode: string | null | undefined;
};

const P2PCreateGift = async ({ params, twoFACode }: Input) => {
  return fetchWithCreds(`${p2pUrl()}/vouchers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(twoFACode && { 'X-Code-2FA': twoFACode }),
      ...(twoFACode === null && { 'X-Code-NO2FA': 'true' }),
    },
    body: JSON.stringify({ ...params, cashTimes: params.cashTimes ?? 1 }),
  });
};

export const useP2PCreateGift = () => {
  const { mutate } = useSWRConfig();

  return useMutation<Input, P2PVoucher | P2PConfirmation>(P2PCreateGift, {
    throwOnFailure: true,
    onSuccess: () => {
      mutate(`${accountUrl()}/balances`);
    },
  });
};
