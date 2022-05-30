import { createContext, ReactNode } from 'react';
import { themeDark, themeLight } from 'web/src/theme/vars.css';
import {
  Links,
  RenderLinkComponent,
  RenderNavLinkComponent,
  TranslateFn,
  UserContext,
} from 'web/src/components/shared/sharedTypes';
import type { LanguageSelectContext } from './UserPanel/LanguageSelect';
import type { ThemeSwitcherContext } from './ThemeSwitcher';

export type HeaderContextValue = UserContext &
  LanguageSelectContext &
  ThemeSwitcherContext & {
    backButton?: ReactNode;
    toMainPage?: string | undefined;
    t: TranslateFn;
    hamburgerShowOnlyTablet?: boolean | undefined;
    beta?: boolean | undefined;
    renderLinkComponent: RenderLinkComponent;
    renderNavLinkComponent: RenderNavLinkComponent;
    pathname?: string;
    navLinks: Links;
    rightNavLinks?: Links;
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
        profileLink: context.profileLink,
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
