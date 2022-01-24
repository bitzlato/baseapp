import { createContext } from 'react';
import { themeDark, themeLight } from 'theme/vars.css';
import {
  Links,
  RenderLinkComponent,
  RenderNavLinkComponent,
  TranslateFn,
  UserContext,
} from 'types';
import { LanguageSelectContext } from './UserPanel/LanguageSelect';
import { ThemeSwitcherContext } from './ThemeSwitcher';

export type HeaderContextValue = UserContext &
  LanguageSelectContext &
  ThemeSwitcherContext & {
    toMainPage?: string | undefined;
    toAdvertsPage?: string | undefined;
    t: TranslateFn;
    hamburgerShowOnlyTablet?: boolean | undefined;
    enableMobileMenu?: boolean | undefined;
    beta?: boolean | undefined;
    renderLinkComponent: RenderLinkComponent;
    renderNavLinkComponent: RenderNavLinkComponent;
    hamburgerLinks: Links;
    navLinks: Links;
    logoLightURL: string;
    logoDarkURL: string;
  };

export const HeaderContext = createContext(null as any as HeaderContextValue);

export const getUserContext = (context: HeaderContextValue): UserContext => {
  switch (context.status) {
    case 'authorization_required': {
      return {
        status: context.status,
        onSignInClick: context.onSignInClick,
        onSignUpClick: context.onSignUpClick,
      };
    }

    case 'authorized': {
      return {
        status: context.status,
        user: context.user,
        userLinks: context.userLinks,
        notifications: context.notifications,
        onAllRead: context.onAllRead,
        onLogoutClick: context.onLogoutClick,
      };
    }

    default: {
      return {
        status: context.status,
      };
    }
  }
};

export const getThemeClassName = ({ theme }: HeaderContextValue): string =>
  theme === 'light' ? themeLight : themeDark;
