import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { accountUrl, p2pUrl } from 'web/src/api/config';
import { fetchJson } from 'web/src/helpers/fetch';
import { P2PWithdrawalParams } from 'web/src/modules/p2p/withdrawal';

type Input = {
  params: P2PWithdrawalParams;
  cryptocurrency: string;
  twoFACode: string | null | undefined;
  blockchainId?: number | undefined;
};

const P2PWithdrawal = async ({ cryptocurrency, params, twoFACode }: Input) => {
  return fetchJson(`${p2pUrl()}/wallets/${cryptocurrency}/withdrawal`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...(twoFACode && { 'X-Code-2FA': twoFACode }),
      ...(twoFACode === null && { 'X-Code-NO2FA': 'true' }),
    },
    credentials: 'include',
  });
};

export const useP2PWithdrawal = () => {
  const { mutate } = useSWRConfig();

  return useMutation(P2PWithdrawal, {
    throwOnFailure: true,
    onSuccess: () => {
      mutate(`${accountUrl()}/balances`);
    },
  });
};
