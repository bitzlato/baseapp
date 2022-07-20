import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { accountUrl, p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { P2PVoucher } from 'web/src/modules/account/voucher-types';

const P2PEditGift = async ({
  deepLinkCode,
  comment,
}: {
  deepLinkCode: P2PVoucher['deepLinkCode'];
  comment: string;
}) => {
  return fetchWithCreds(`${p2pUrl()}/vouchers/${deepLinkCode}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment }),
  });
};

export const useP2PEditGift = () => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();

  return useMutation(P2PEditGift, {
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
