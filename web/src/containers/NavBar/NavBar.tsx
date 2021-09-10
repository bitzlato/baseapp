import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from 'src/modules';
import { useT } from 'src/hooks/useT';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/Button/Button';

import { LanguageSwitcher } from './LanguageSwitcher/LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher/ThemeSwitcher';
import { ToProfileButton } from './ToProfileButton/ToProfileButton';
import { LogoutButton } from './LogoutButton/LogoutButton';

import s from './NavBar.postcss';

export const NavBar: FC = () => {
    const t = useT();
    const isLoggedIn = useSelector(selectUserLoggedIn);

    return (
        <div className={s.navBar}>
            {!isLoggedIn && (
                <>
                    <div className={s.item}>
                        <Button component={Link} to="/signin">
                            {t('page.header.navbar.signIn')}
                        </Button>
                    </div>
                    <div className={s.item}>
                        {/* signup ID is needed for GA event */}
                        <Button id="signup" color="secondary" component={Link} to="/signup">
                            {t('page.header.signUp')}
                        </Button>
                    </div>
                </>
            )}

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
