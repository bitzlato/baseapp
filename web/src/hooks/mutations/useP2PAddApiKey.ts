import { useDispatch } from 'react-redux';
import useMutation from 'use-mutation';
import { p2pAuthUrl } from 'web/src/api/config';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';

const P2PAddApiKey = async ({
  params,
  twoFACode,
}: {
  params: {
    active: boolean;
    authorities: {
      canRead: boolean;
      canTrade: boolean;
      canTransfer: boolean;
    };
    key: string;
    name: string;
  };
  twoFACode?: string | null | undefined;
}) => {
  const res = await fetchJson(`${p2pAuthUrl()}/keys/`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...(twoFACode === null && { 'X-Code-NO2FA': 'true' }),
      ...(twoFACode && { 'X-Code-2FA': twoFACode }),
    },
    credentials: 'include',
  });

  return res;
};

export const useP2PAddApiKey = ({
  onSuccess,
  onNo2FAUserApprove,
  on2FACodeRequest,
}: {
  onSuccess: (email?: string) => void;
  onNo2FAUserApprove: () => void;
  on2FACodeRequest: () => void;
}) => {
  const dispatch = useDispatch();

  return useMutation(P2PAddApiKey, {
    onSuccess: ({ data }) => {
      onSuccess(data.email);
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        if (error.payload.code === 'NoTwoFaUserApprove') {
          onNo2FAUserApprove();
        } else if (error.code === 478 && error.payload.message === '2FA Token Required') {
          on2FACodeRequest();
        } else {
          alertFetchError(dispatch, error);
        }
      }
    },
  });
};
