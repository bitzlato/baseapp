import { ReactNode } from 'react';
import {
  USER_STATUS_AUTHORIZATION_REQUIRED,
  USER_STATUS_AUTHORIZED,
  USER_STATUS_NOT_AUTHORIZED,
} from './sharedConstants';

export type IconName = 'profile' | 'logout' | 'telegram' | 'invoices';

export type User = {
  userpic?: string | undefined;
  username?: string | undefined;
};

export type RenderLinkComponent = (props: {
  key?: string | undefined;
  className?: string | undefined;
  to: string;
  title?: string | undefined;
  children: ReactNode;
  onClick?: (() => void) | undefined;
}) => JSX.Element;

export type RenderNavLinkComponent = (props: {
  key?: string | undefined;
  className: string;
  activeClassName: string;
  to: string;
  children: ReactNode;
  exact?: boolean;
  onClick?: (() => void) | undefined;
}) => JSX.Element;

export type LinkType = 'internal' | 'external';
export type CommonLink = {
  key: string;
  children: string | ReactNode;
};
export type LinkNav = CommonLink & {
  type: LinkType;
  to: string;
};
export type LinkTabs = CommonLink & {
  type: 'tab';
  link?: {
    type: LinkType;
    to: string;
  };
  tabs: LinkNav[];
};
export type Link = LinkNav | LinkTabs;
export type Links = Link[];

export type UserLink = LinkNav & {
  icon?: IconName | undefined;
};
export type UserLinks = UserLink[];

export type BottomTabIconName = 'home' | 'exchange' | 'trading' | 'wallets' | 'p2p';
export type BottomTabLink = {
  to: string;
  type: 'internal' | 'external';
  exact?: boolean;
  title: string;
  icon: BottomTabIconName;
};

export type TranslateFn = (key: string) => string;

export type Notify = {
  id: string;
  message: string;
  date: ReactNode;
  time: ReactNode;
  read: boolean;
  onClick?: (() => void) | undefined;
};

export type UserContext =
  | {
      status: typeof USER_STATUS_NOT_AUTHORIZED;
    }
  | {
      status: typeof USER_STATUS_AUTHORIZATION_REQUIRED;
      onSignInClick: () => void;
      onSignUpClick: () => void;
    }
  | {
      status: typeof USER_STATUS_AUTHORIZED;
      user?: User | undefined;
      profileLink?: UserLink | undefined;
      userLinks?: UserLinks | undefined;
      notifications?: Notify[] | undefined;
      onAllRead?: (() => void) | undefined;
      onLogoutClick: () => void;
    };
