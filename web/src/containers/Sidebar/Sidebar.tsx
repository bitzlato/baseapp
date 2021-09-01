import React, { FC, Fragment, useCallback, useRef } from 'react';
import cn from 'classnames';
import { logoutFetch, RootState, selectSidebarState, selectUserLoggedIn, toggleSidebar } from 'src/modules';
import { useDispatch, useSelector } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { LogoutIcon } from 'src/assets/icons/LogoutIcon';
import { useOnClickOutside } from 'src/hooks/useOnClickOutside';
import { useEscapeKeyDown } from 'src/hooks/useEscapeKeyDown';
import { ProfileIcon } from 'src/assets/icons/ProfileIcon';
import { SignupIcon } from 'src/assets/icons/SignupIcon';
import { TrandingIcon } from 'src/assets/icons/TrandingIcon';
import { WalletsIcon } from 'src/assets/icons/WalletsIcon';
import { OrdersIcon } from 'src/assets/icons/OrdersIcon';
import { HistoryIcon } from 'src/assets/icons/HistoryIcon';
import { ApiIcon } from 'src/assets/icons/ApiIcon';

import s from './Sidebar.postcss';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { SidebarToggler } from './SidebarToggler/SidebarToggler';

export const Sidebar: FC = () => {
    const elementRef = useRef<HTMLDivElement>();
    const { isOpen, isLoggedIn } = useSelector((state: RootState) => ({
        isOpen: selectSidebarState(state),
        isLoggedIn: selectUserLoggedIn(state),
    }));
    const dispatch = useDispatch();
    const t = useT();

    const handleOnOutsideClick = useCallback(() => {
        if (isOpen) {
            dispatch(toggleSidebar(false));
        }
    }, [isOpen]);

    useOnClickOutside(elementRef, handleOnOutsideClick);
    useEscapeKeyDown(handleOnOutsideClick);

    const handleTogglerClick = () => {
        dispatch(toggleSidebar());
    };
    const handleLogoutClick = () => {
        dispatch(logoutFetch());
    };

    return (
        <div className={s.block} ref={elementRef}>
            <SidebarToggler onClick={handleTogglerClick} />
            <div className={cn(s.sidebar, isOpen && s.sidebarOpen)}>
                {isLoggedIn ? (
                    <SidebarItem to="/profile" icon={<ProfileIcon />}>
                        {t('page.header.navbar.profile')}
                    </SidebarItem>
                ) : (
                    <>
                        <SidebarItem to="/signin" icon={<ProfileIcon />}>
                            {t('page.header.navbar.signIn')}
                        </SidebarItem>
                        <SidebarItem to="/signup" icon={<SignupIcon />}>
                            {t('page.header.signUp')}
                        </SidebarItem>
                    </>
                )}
                <SidebarItem to="/trading" icon={<TrandingIcon />}>
                    {t('page.header.navbar.trade')}
                </SidebarItem>
                {isLoggedIn && (
                    <>
                        <SidebarItem to="/wallets" icon={<WalletsIcon />}>
                            {t('page.header.navbar.wallets')}
                        </SidebarItem>
                        <SidebarItem to="/openOrders" icon={<OrdersIcon />}>
                            {t('page.header.navbar.openOrders')}
                        </SidebarItem>
                        <SidebarItem to="/history" icon={<HistoryIcon />}>
                            {t('page.header.navbar.history')}
                        </SidebarItem>
                    </>
                )}
                <SidebarItem to="/docs" icon={<ApiIcon />}>
                    {t('page.header.navbar.api')}
                </SidebarItem>
                {isLoggedIn && (
                    <SidebarItem icon={<LogoutIcon />} onClick={handleLogoutClick}>
                        {t('page.body.profile.content.action.logout')}
                    </SidebarItem>
                )}
            </div>
        </div>
    );
};
