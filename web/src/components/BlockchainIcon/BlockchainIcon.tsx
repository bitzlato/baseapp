import React, { FC } from 'react';
import { HTIcon } from 'src/assets/icons/HTIcon';
import { BNBIcon } from 'src/assets/icons/BNBIcon';

interface Props {
  className?: string;
  protocol: string;
}

export const BlockchainIcon: FC<Props> = ({ className, protocol }) => {
  switch (protocol.toLowerCase()) {
    case 'erc20':
      return (
        <img
          className={className}
          src={require(`cryptocurrency-icons/svg/color/eth.svg`)}
          alt="ETH"
        />
      );

    case 'plgn':
      return (
        <img
          className={className}
          src={require(`cryptocurrency-icons/svg/color/matic.svg`)}
          alt="Polygon"
        />
      );

    case 'bep20':
      return <BNBIcon className={className} />;

    case 'hrc20':
      return <HTIcon className={className} />;

    default:
      return null;
  }
};
