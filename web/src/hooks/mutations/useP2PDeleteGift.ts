import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { accountUrl, p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { P2PVoucher } from 'web/src/modules/account/voucher-types';

const P2PDeleteGift = async (deepLinkCode: P2PVoucher['deepLinkCode']) => {
  return fetchWithCreds(`${p2pUrl()}/vouchers/${deepLinkCode}`, {
    method: 'DELETE',
  });
};

export const useP2PDeleteGift = () => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();

  return useMutation(P2PDeleteGift, {
    throwOnFailure: true,
    onSuccess: () => {
      mutate(`${accountUrl()}/balances`);
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        handleFetchError(error);
      }
    },
  });
};
