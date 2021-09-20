import React, { FC, useContext, ReactNode } from 'react';
import cn from 'classnames';
import { TabsContext } from 'src/components/Tabs';

import s from './Tab.postcss';

interface Props {
    activeClassName?: string;
    children: ReactNode;
    className?: string;
    size?: 'small' | 'medium' | 'large';
    value: string;
}

export const Tab: FC<Props> = ({ activeClassName, children, className, size = 'medium', value }: Props) => {
    const { currentTab, setCurrentTab } = useContext(TabsContext);
    const isActive = currentTab === value;
    const handleClick = () => setCurrentTab(value);

    return (
        <button
            className={cn({
                [s.tab]: true,
                [s.tabActive]: isActive,
                [s.tabSmall]: size === 'small',
                [s.tabMedium]: size === 'medium',
                [s.tabLarge]: size === 'large',
                [className]: true,
                [activeClassName]: isActive,
            })}
            type="button"
            onClick={handleClick}
        >
            {children}
        </button>
    );
};
