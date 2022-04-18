import { FC } from 'react';
import { Ads } from './Ads';

interface Props {}

export const Board: FC<Props> = () => {
  return (
    <Ads
      type="selling"
      currency="RUB"
      cryptocurrency="BTC"
      isOwnerVerificated
      isOwnerTrusted={false}
      isOwnerActive={false}
      paymethod={443}
    />
  );
};
