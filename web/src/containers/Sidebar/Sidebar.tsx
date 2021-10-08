import React, { FC, useCallback, useRef } from 'react';
import cn from 'classnames';
import {
  logoutFetch,
  RootState,
  selectSidebarState,
  selectUserLoggedIn,
  toggleSidebar,
  selectCurrentLanguage,
} from 'src/modules';
import { useDispatch, useSelector } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { LogoutIcon } from 'src/assets/icons/LogoutIcon';
import { useOnClickOutside } from 'src/hooks/useOnClickOutside';
import { useEscapeKeyDown } from 'src/hooks/useEscapeKeyDown';
import { ProfileIcon } from 'src/assets/icons/ProfileIcon';
import { TrandingIcon } from 'src/assets/icons/TrandingIcon';
import { WalletsIcon } from 'src/assets/icons/WalletsIcon';
import { OrdersIcon } from 'src/assets/icons/OrdersIcon';
import { HistoryIcon } from 'src/assets/icons/HistoryIcon';
import { ApiIcon } from 'src/assets/icons/ApiIcon';
import { InternalTransferIcon } from 'src/assets/icons/InternalTransferIcon';
import { showInternalTransfer } from 'src/api/config';
import { P2PIcon } from 'src/assets/icons/P2PIcon';
import { getLinkToP2P } from 'src/containers/Header/HeaderNavigation/getLinkToP2P';

import { SignupIcon } from 'src/assets/icons/SignupIcon';

import { SidebarItem } from './SidebarItem/SidebarItem';
import { SidebarToggler } from './SidebarToggler/SidebarToggler';

import s from './Sidebar.postcss';

const selector = (state: RootState) => ({
  isLoggedIn: selectUserLoggedIn(state),
  isOpen: selectSidebarState(state),
  languageCode: selectCurrentLanguage(state),
});

export const Sidebar: FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, isOpen, languageCode } = useSelector(selector);
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
  const handleItemClick = () => {
    dispatch(toggleSidebar(false));
  };
  const handleLogoutClick = () => {
    handleItemClick();
    dispatch(logoutFetch());
  };

  return (
    <div className={s.block} ref={elementRef}>
      <SidebarToggler onClick={handleTogglerClick} />
      <div className={cn(s.sidebar, isOpen && s.sidebarOpen)}>
        {isLoggedIn ? (
          <SidebarItem to="/profile" icon={<ProfileIcon />} onClick={handleItemClick}>
            {t('page.header.navbar.profile')}
          </SidebarItem>
        ) : (
          <>
            <SidebarItem to="/signin" icon={<ProfileIcon />} onClick={handleItemClick}>
              {t('page.header.navbar.signIn')}
            </SidebarItem>
            <SidebarItem to="/signup" icon={<SignupIcon />} onClick={handleItemClick}>
              {t('page.header.signUp')}
            </SidebarItem>
          </>
        )}
        <SidebarItem to="/trading" icon={<TrandingIcon />} onClick={handleItemClick}>
          {t('page.header.navbar.trade')}
        </SidebarItem>
        {isLoggedIn && (
          <>
            <SidebarItem to="/wallets" icon={<WalletsIcon />} onClick={handleItemClick}>
              {t('page.header.navbar.wallets')}
            </SidebarItem>
            <SidebarItem to="/orders" icon={<OrdersIcon />} onClick={handleItemClick}>
              {t('page.header.navbar.openOrders')}
            </SidebarItem>
            <SidebarItem to="/history" icon={<HistoryIcon />} onClick={handleItemClick}>
              {t('page.header.navbar.history')}
            </SidebarItem>
          </>
        )}
        <SidebarItem to={getLinkToP2P(languageCode)} icon={<P2PIcon />} external>
          {t('page.header.navbar.toP2P')}
        </SidebarItem>
        <SidebarItem to="/docs" icon={<ApiIcon />} onClick={handleItemClick}>
          {t('page.header.navbar.api')}
        </SidebarItem>
        {isLoggedIn && (
          <>
            {showInternalTransfer() && (
              <SidebarItem
                to="/internal-transfer"
                icon={<InternalTransferIcon />}
                onClick={handleItemClick}
              >
                {t('page.header.navbar.internal.transfer')}
              </SidebarItem>
            )}
            <SidebarItem icon={<LogoutIcon />} onClick={handleLogoutClick}>
              {t('page.body.profile.content.action.logout')}
            </SidebarItem>
          </>
        )}
      </div>
    </div>
  );
};
