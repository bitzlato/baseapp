import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { pgRoutes } from 'src/constants';
import { useT } from 'src/hooks/useT';
import { selectUserLoggedIn } from 'src/modules';

import s from './HeaderNavigation.postcss';

export const HeaderNavigation: FC = () => {
    const t = useT();
    const isLoggedIn = useSelector(selectUserLoggedIn);
    let links = pgRoutes(isLoggedIn, false);
    if (isLoggedIn) {
        links = [['page.header.navbar.profile', 'profile'], ...links];
    }

    return (
        <div className={s.navigation}>
            {links.map(([id, link]) => (
                <Link key={id} className={s.item} to={link}>
                    {t(id)}
                </Link>
            ))}
        </div>
    );
};
