import React, { FC } from 'react';
import ETH from 'cryptocurrency-icons/svg/color/eth.svg';
import { HTIcon } from 'src/assets/icons/HTIcon';
import { BNBIcon } from 'src/assets/icons/BNBIcon';

interface Props {
    className?: string;
    protocol: string;
}

export const BlockchainIcon: FC<Props> = ({ className, protocol }: Props) => {
    switch (protocol.toLowerCase()) {
        case 'erc20':
            return <img className={className} src={ETH} alt="ETH" />;

        case 'bep20':
            return <BNBIcon className={className} />;

        case 'hrc20':
            return <HTIcon className={className} />;

        default:
            return null;
    }
};
