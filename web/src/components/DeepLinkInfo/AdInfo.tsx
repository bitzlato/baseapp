import { FC } from 'react';
import { DeepLinkInfoType, DeeplinkPayloadAd } from './types';

interface Props {
  deeplink: DeepLinkInfoType & {
    payload: DeeplinkPayloadAd;
  };
}

export const AdInfo: FC<Props> = () => {
  return <div>Advertisement</div>;
};
