import { ComponentProps, FC, useCallback, useState } from 'react';
import { Language, Theme } from 'web/src/types';
import {
  Header,
  USER_STATUS_NOT_AUTHORIZED,
  USER_STATUS_AUTHORIZATION_REQUIRED,
  USER_STATUS_AUTHORIZED,
} from 'web/src/components/shared/Header/Header';
import { getLinkToP2P } from 'web/src/components/Header/getLinkToP2P';
import { useFetchResourceUsersMe } from 'web/src/hooks/data/barong/useFetchResourceUsersMe';
import { RenderLinkComponent, UserLink, UserLinks } from 'web/src/components/shared/sharedTypes';
import { useDeleteIdentitySessions } from 'web/src/hooks/mutations/useDeleteIdentitySessions';
import { NotificationModalNotification } from 'web/src/containers/NotificationModal/types';
import { useFetchP2PNotifications } from 'web/src/hooks/data/useFetchP2PNotifications';
import { useMarkNotificationAsRead } from 'web/src/hooks/mutations/useMarkNotificationAsRead';
import { notificationInfo } from 'web/src/components/Header/notificationInfo';
import { isToday, isYesterday } from 'web/src/helpers/checkDate';
import { localeDate } from 'web/src/helpers/localeDate';
import { NotificationModal } from 'web/src/containers/NotificationModal/NotificationModal';
import { useNotificator } from 'web/src/components/app/useNotificator';
import { Notification } from 'web/src/lib/socket/types';
import { createT } from 'web/src/components/shared/sharedI18n';
import { StandaloneComponentProps } from './types';

type Links = ComponentProps<typeof Header>['navLinks'];

interface Props extends StandaloneComponentProps {}

const languages = {
  en: 'English',
  ru: 'Русский',
};

// eslint-disable-next-line jsx-a11y/anchor-has-content
const renderLink: RenderLinkComponent = ({ to, ...props }) => <a href={to} {...props} />;

export const StandaloneHeader: FC<Props> = ({
  theme,
  language,
  onThemeChange,
  onLanguageChange,
}) => {
  const t = createT(language);
  const { data: user, error, isValidating } = useFetchResourceUsersMe();
  const isUserFetching = user === undefined && error === undefined && isValidating;
  const isLoggedIn = user !== undefined;
  const [logout] = useDeleteIdentitySessions();
  const { data: notifications = [], mutate: notificationsMutate } =
    useFetchP2PNotifications(isLoggedIn);
  const [markNotificationAsReadP2P] = useMarkNotificationAsRead();
  const useNotificationSubscribe = useNotificator(isLoggedIn);
  const [nofiticationModalProps, setNofiticationModalProps] = useState<
    NotificationModalNotification | undefined
  >();

  const merchantClient = (user?.bitzlato_user?.roles ?? []).includes('merchantClient');

  useNotificationSubscribe(
    useCallback(
      ({ notificationId: id, name, ...data }) => {
        const newNotify: Notification = {
          id,
          name,
          read: false,
          data,
        };

        notificationsMutate((oldData) => (oldData ? [newNotify].concat(...oldData) : [newNotify]));
      },
      [notificationsMutate],
    ),
  );

  const translate = useCallback(
    (key: string) => {
      switch (key) {
        case 'signIn':
          return t('page.header.navbar.signIn');

        case 'signUp':
          return t('page.header.signUp');

        case 'profile':
          return t('page.header.navbar.profile');

        case 'logout':
          return t('page.header.navbar.logout');

        case 'notifications_empty':
          return t('notifications.empty');

        case 'notificationsTitle':
          return t('notifications.title');

        case 'notificationUnread':
          return t('notifications.unread');

        case 'notificationRead':
          return t('notifications.read');

        case 'darkTheme':
          return t('DarkTheme');

        default:
          throw new Error(`translate: Key '${key}' not found`);
      }
    },
    [t],
  );

  const p2pURL = getLinkToP2P(language);
  const navLinks: Links = [
    {
      key: 'p2p',
      type: 'tab',
      link: {
        type: 'external',
        to: p2pURL,
      },
      children: t('P2P'),
      tabs: [
        {
          key: 'Ad board',
          type: 'external',
          to: p2pURL,
          children: t('AD Board'),
        },
        {
          key: 'My adverts',
          type: 'external',
          to: `${p2pURL}/adverts`,
          children: t('My adverts'),
        },
        {
          key: 'My trades',
          type: 'external',
          to: `${p2pURL}/trades`,
          children: t('My trades'),
        },
      ],
    },
    {
      key: 'exchange',
      type: 'tab',
      link: {
        type: 'external',
        to: '/trading',
      },
      children: t('Exchange'),
      tabs: [
        {
          key: 'trading',
          type: 'external',
          to: '/trading',
          children: t('page.header.navbar.trade'),
        },
        {
          key: 'orders',
          type: 'external',
          to: '/orders',
          children: t('page.header.navbar.openOrders'),
        },
        {
          key: 'history',
          type: 'external',
          to: '/history',
          children: t('page.header.navbar.history'),
        },
      ],
    },
    {
      key: 'quick-exchange',
      type: 'external',
      to: '/quick-exchange',
      children: t('page.header.navbar.quick-exchange'),
    },
    {
      key: 'gifts',
      type: 'tab',
      link: {
        type: 'external',
        to: '/gifts',
      },
      children: t('Gifts'),
      tabs: [
        {
          key: 'Create gift',
          type: 'external',
          to: '/gifts',
          children: t('gifts.createGift'),
          exact: true,
        },
        {
          key: 'Active gifts',
          type: 'external',
          to: '/gifts/active',
          children: t('gifts.activeGifts'),
          exact: true,
        },
        {
          key: 'Gifts history',
          type: 'external',
          to: '/gifts/history',
          children: t('gifts.giftsHistory'),
          exact: true,
        },
      ],
    },
  ];

  const rightNavLinks: Links = [
    {
      key: 'wallets',
      type: 'external',
      to: '/wallets',
      children: t('page.header.navbar.balances'),
    },
  ];

  let userProps;
  if (isUserFetching) {
    userProps = { status: USER_STATUS_NOT_AUTHORIZED };
  } else if (!isLoggedIn) {
    userProps = {
      status: USER_STATUS_AUTHORIZATION_REQUIRED,
      onSignInClick: () => window.location.assign('/signin'),
      onSignUpClick: () => window.location.assign('/signup'),
    };
  } else {
    const profileLink: UserLink = {
      key: 'profile',
      type: 'internal',
      to: '/profile',
      icon: 'profile',
      children: t('page.header.navbar.profile'),
    };

    const userLinks = [
      {
        key: 'telegram',
        type: 'external',
        to: `/${language}/profile/telegram`,
        icon: 'telegram',
        children: t('Telegram'),
      },
      merchantClient
        ? {
            key: 'merch',
            type: 'external',
            to: `/${language}/merch`,
            icon: 'invoices',
            children: t('Invoices'),
          }
        : null,
      {
        key: 'trader-workspace',
        type: 'external',
        to: `/${language}/trader-workspace`,
        icon: 'trader-workspace',
        children: t('Trader Workspace'),
      },
    ].filter(Boolean) as UserLinks;

    const handleMarkAllNotificationAsRead = () =>
      notifications.forEach((n) => {
        if (!n.read) {
          markNotificationAsReadP2P(n.id);
        }
      });

    const handleMarkNotificationAsRead = (notificationId: number) =>
      markNotificationAsReadP2P(notificationId);

    userProps = {
      status: USER_STATUS_AUTHORIZED,
      profileLink,
      userLinks,
      onLogoutClick: () => logout(undefined),
      notifications: notifications.map((notification) => {
        const notify: NotificationModalNotification = notificationInfo(notification, {
          translate: t,
          lang: language,
        }) as NotificationModalNotification;
        const handleNotifyClick = () => {
          handleMarkNotificationAsRead(notification.id);

          if (notify.alert) {
            setNofiticationModalProps(notify);
          }

          if (notify.link) {
            window.location.assign(notify.link);
          }
        };

        const calculateDate = () => {
          if (isToday(notify.createdAt!)) {
            return t('today');
          }

          if (isYesterday(notify.createdAt!)) {
            return t('yesterday');
          }

          return localeDate(notify.createdAt, 'veryShortDate', language);
        };

        return {
          id: notification.id.toString(),
          message: notify.text,
          time: localeDate(notify.createdAt, 'time'),
          date: calculateDate(),
          read: notification.read,
          onClick: handleNotifyClick,
        };
      }),
      onAllRead: handleMarkAllNotificationAsRead,
    };
  }

  const handleThemeChange = (nextTheme: Theme) => onThemeChange?.(nextTheme);
  const handleLanguageChange = (nextLanguage: Language) => onLanguageChange?.(nextLanguage);
  const closeNotificationModal = () => setNofiticationModalProps(undefined);

  return (
    <>
      {nofiticationModalProps && (
        <NotificationModal
          notification={nofiticationModalProps}
          handleClose={closeNotificationModal}
        />
      )}
      <Header
        logoLightURL={window.env.logoUrl}
        logoDarkURL={window.env.logoDarkUrl}
        toMainPage="/"
        theme={theme}
        language={language}
        languages={languages}
        navLinks={navLinks}
        rightNavLinks={rightNavLinks}
        t={translate}
        renderLinkComponent={renderLink}
        renderNavLinkComponent={renderLink}
        {...userProps}
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      />
    </>
  );
};
