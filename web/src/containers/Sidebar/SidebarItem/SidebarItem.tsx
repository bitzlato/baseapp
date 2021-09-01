import React, { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import s from './SidebarItem.postcss';

type Props = {
    to?: string;
    icon: ReactNode;
    children: ReactNode;
    onClick?: () => void;
};

export const SidebarItem: FC<Props> = ({ children, icon, onClick, to }: Props) => {
    const body = (
        <>
            <span className={s.itemIcon}>{icon}</span>
            {children}
        </>
    );

    if (to === undefined) {
        return (
            <button className={s.item} type="button" tabIndex={-1} onClick={onClick}>
                {body}
            </button>
        );
    }

    return (
        <NavLink className={s.item} activeClassName={s.itemActive} to={to} onClick={onClick}>
            {body}
        </NavLink>
    );
};
