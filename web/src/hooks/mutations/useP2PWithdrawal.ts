import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';
import { P2PWithdrawalParams } from 'web/src/modules/p2p/withdrawal';

type Input = {
  params: P2PWithdrawalParams;
  cryptocurrency: string;
  twoFACode?: string | null;
};

const P2PWithdrawal = async ({ cryptocurrency, params, twoFACode }: Input) => {
  return fetchJson(`${p2pUrl()}/wallets/${cryptocurrency}/withdrawal`, {
    method: 'POST',
    body: JSON.stringify({ makeWithdraw: params }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...(twoFACode && { 'X-Code-2FA': twoFACode }),
      ...(twoFACode === null && { 'X-Code-NO2FA': 'true' }),
    },
    credentials: 'include',
  });
};

export const useP2PWithdrawal = () => {
  const dispatch = useDispatch();

  return useMutation(P2PWithdrawal, {
    throwOnFailure: true,
    onSuccess: () => {
      dispatch(alertPush({ message: ['success.withdraw.action'], type: 'success' }));
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        alertFetchError(dispatch, error);
      }
    },
  });
};
