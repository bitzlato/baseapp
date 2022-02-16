import { ReactNode } from 'react';
import {
  USER_STATUS_AUTHORIZATION_REQUIRED,
  USER_STATUS_AUTHORIZED,
  USER_STATUS_NOT_AUTHORIZED,
} from './sharedConstants';

export type IconName =
  | 'profile'
  | 'signup'
  | 'quickExchange'
  | 'trading'
  | 'wallets'
  | 'orders'
  | 'history'
  | 'p2p'
  | 'api'
  | 'logout'
  | 'question';
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
}) => ReactNode;

export type RenderNavLinkComponent = (props: {
  key?: string | undefined;
  className: string;
  activeClassName: string;
  to: string;
  children: ReactNode;
  onClick?: (() => void) | undefined;
}) => ReactNode;

export type LinkType = 'internal' | 'external';
export type Link = {
  key: string;
  icon?: IconName | undefined;
  children: string;
} & (
  | {
      type: LinkType;
      to: string;
    }
  | { onClick: () => void }
);
export type Links = Link[];

export type TranslateFn = (key: string) => string;

export type Notify = {
  id: string;
  message: string;
  date: ReactNode;
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
      userLinks?: Links | undefined;
      notifications?: Notify[] | undefined;
      onAllRead?: (() => void) | undefined;
      onLogoutClick: () => void;
    };
