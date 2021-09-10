import React, { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import s from './SidebarItem.postcss';

type Props = {
    to?: string;
    icon: ReactNode;
    children: ReactNode;
    external?: boolean;
    onClick?: () => void;
};

export const SidebarItem: FC<Props> = ({ children, icon, to, external = false, onClick }: Props) => {
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

    if (external) {
        return (
            <a className={s.item} href={to} onClick={onClick}>
                {body}
            </a>
        );
    }

    return (
        <NavLink className={s.item} activeClassName={s.itemActive} to={to} onClick={onClick}>
            {body}
        </NavLink>
    );
};
