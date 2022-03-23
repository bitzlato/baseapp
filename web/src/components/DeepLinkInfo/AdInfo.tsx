import { FC } from 'react';
import { DeepLinkInfoType } from './types';

interface Props {
  deeplink: DeepLinkInfoType;
}

export const AdInfo: FC<Props> = () => {
  return <div>Advertisement</div>;
};
