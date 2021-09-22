import React, { FC } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BlockchainIcon } from 'src/components/BlockchainIcon/BlockchainIcon';

import s from './CurrencyTicker.postcss';

type Props = {
    symbol: string;
};

export const CurrencyTicker: FC<Props> = ({ symbol }: Props) => {
    const [currency, protocol] = symbol.split('-');
    const content = (
        <span className={s.currency}>
            <span>{currency.toUpperCase()}</span>
            {protocol && <BlockchainIcon className={s.blockchainIcon} protocol={protocol} />}
        </span>
    );

    return protocol ? (
        <OverlayTrigger placement="bottom" overlay={<Tooltip id={symbol}>{symbol.toUpperCase()}</Tooltip>}>
            {content}
        </OverlayTrigger>
    ) : (
        content
    );
};
