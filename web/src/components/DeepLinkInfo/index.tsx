import { FC } from 'react';
import { accountPublicUrl } from 'web/src/api';
import { fetchJson } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { AdInfo } from './AdInfo';
import { DeepLinkInfoType, DeeplinkTypes } from './types';
import { VoucherInfo } from './VoucherInfo';

export const useDeeplinkInfo = (deeplinkId: string) => {
  const { data, error, isValidating } = useFetch(
    `${accountPublicUrl()}/deeplinks/${deeplinkId}`,
    fetchJson,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    deeplink: data,
    isLoading: isValidating,
    isError: error,
  };
};

export const deeplinkTitle = (deeplink: DeepLinkInfoType): string => {
  if (!deeplink || !deeplink.type) {
    return 'deeplink.cant_load';
  }

  switch (deeplink.type) {
    case DeeplinkTypes.Ad:
      return 'deeplink.ad.title';
    case DeeplinkTypes.Voucher:
      return 'deeplink.voucher.title';
    default:
      return 'deeplink.not_supported';
  }
};

type Props = {
  deeplink: DeepLinkInfoType;
};

export const DeepLinkInfo: FC<Props> = ({ deeplink }) => {
  switch (deeplink?.type) {
    case DeeplinkTypes.Ad:
      return <AdInfo deeplink={deeplink} />;
    case DeeplinkTypes.Voucher:
      return <VoucherInfo deeplink={deeplink} />;
    default:
      return null;
  }
};
