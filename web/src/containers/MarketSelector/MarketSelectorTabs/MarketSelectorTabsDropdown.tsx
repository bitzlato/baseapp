import React, { FC, ReactNode, useState, useRef, useCallback } from 'react';
import { ArrowRightIcon } from 'src/assets/icons/ArrowRightIcon';
import cn from 'classnames';

import s from './MarketSelectorTabsDropdown.postcss';

interface Props {
    children: ReactNode;
    opened: boolean;
    onTogglerClick: () => void;
}

export const MarketSelectorTabsDropdown: FC<Props> = ({ children, opened, onTogglerClick }: Props) => {
    return (
        <>
            <button className={cn(s.toggler, opened && s.togglerActive)} onClick={onTogglerClick}>
                <ArrowRightIcon />
            </button>
            <div className={cn(s.dropdown, opened && s.dropdownOpened)}>{children}</div>
        </>
    );
};
