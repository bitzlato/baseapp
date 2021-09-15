import React, { FC } from 'react';
import { CryptoIcon } from 'src/components/CryptoIcon';

import s from './CryptoCurrencyIcon.postcss';

interface Props {
    currency: string;
    iconId?: string;
}

const getCryptoCurrencySymbolByProtocol = (protocol: string) => {
    switch (protocol) {
        case 'erc20':
            return 'eth';

        case 'bep20':
            return 'bnb';

        default:
            return undefined;
    }
};

export const CryptoCurrencyIcon: FC<Props> = ({ currency, iconId }: Props) => {
    const [cryptoCurrency, protocol] = currency.split('-');
    const icon = iconId ?? cryptoCurrency;
    const blockchainIcon = protocol ? getCryptoCurrencySymbolByProtocol(protocol) : undefined;

    return (
        <span className={s.icon}>
            <CryptoIcon code={icon} />
            {blockchainIcon && <CryptoIcon className={s.blockchainIcon} code={blockchainIcon} />}
        </span>
    );
};
