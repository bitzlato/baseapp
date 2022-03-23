import { FC } from 'react';
import { AdInfo } from './AdInfo';
import { DeepLinkInfoType, DeeplinkTypes } from './types';
import { VoucherInfo } from './VoucherInfo';

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
