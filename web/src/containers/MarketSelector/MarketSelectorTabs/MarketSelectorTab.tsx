import React, { FC } from 'react';
import cn from 'classnames';

import s from './MarketSelectorTab.postcss';

interface Props {
    id: string;
    active?: boolean;
    activeId?: string;
    onClick: (carrency: string) => void;
}

export const MarketSelectorTab: FC<Props> = props => {
    const handleClick = () => props.onClick(props.id);

    const className = cn(s.tab, (props.active || props.activeId === props.id) && s.tabActive);

    return (
        <button className={className} type="button" onClick={handleClick}>
            {props.children}
        </button>
    );
};
