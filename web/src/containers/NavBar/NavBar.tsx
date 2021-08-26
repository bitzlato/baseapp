import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import { selectUserLoggedIn } from 'src/modules';

import { LanguageSwitcher } from './LanguageSwitcher/LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher/ThemeSwitcher';
import { ToProfileButton } from './ToProfileButton/ToProfileButton';
import s from './NavBar.postcss';
import { LogoutButton } from './LogoutButton/LogoutButton';

export const NavBar: FC = () => {
    const isLoggedIn = useSelector(selectUserLoggedIn);

    return (
        <div className={s.navBar}>
            <div className={s.item}>
                <ThemeSwitcher />
            </div>
            <div className={s.item}>
                <LanguageSwitcher />
            </div>
            {isLoggedIn && (
                <>
                    <div className={s.item}>
                        <ToProfileButton />
                    </div>
                    <div className={s.item}>
                        <LogoutButton />
                    </div>
                </>
            )}
        </div>
    );
};
