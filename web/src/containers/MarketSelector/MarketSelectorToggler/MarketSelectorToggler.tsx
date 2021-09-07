import React, { FC } from 'react';
import cn from 'classnames';
import { ArrowRightIcon } from 'src/assets/icons/ArrowRightIcon';
import { Market } from 'src/modules';
import { MarketName } from 'src/components/MarketName/MarketName';

import s from './MarketSelectorToggler.postcss';

interface Props {
    active: boolean;
    market: Market;
    onClick: () => void;
}

export const MarketSelectorToggler: FC<Props> = ({ market, active, onClick }: Props) => (
    <button className={cn(s.toggler, active && s.togglerActive)} type="button" onClick={onClick}>
        <span className={s.name}>
            <MarketName name={market.name} />
        </span>
        <ArrowRightIcon />
    </button>
);
