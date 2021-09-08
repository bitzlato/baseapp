import React, { FC, ReactNode } from 'react';

import { NavLink } from 'react-router-dom';

import s from './HeaderNavigationItem.postcss';

type Props = {
    children: ReactNode;
    to: string;
    external?: boolean;
};

export const HeaderNavigationItem: FC<Props> = ({ children, to, external = false }: Props) => {
    if (external) {
        return (
            <a className={s.item} href={to} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return (
        <NavLink className={s.item} activeClassName={s.itemActive} to={to}>
            {children}
        </NavLink>
    );
};
