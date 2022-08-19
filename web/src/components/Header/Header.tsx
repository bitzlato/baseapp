import { ComponentProps, FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Header as SharedHeader,
  USER_STATUS_NOT_AUTHORIZED,
  USER_STATUS_AUTHORIZATION_REQUIRED,
  USER_STATUS_AUTHORIZED,
} from 'web/src/components/shared/Header/Header';
import {
  changeColorTheme,
  selectCurrentColorTheme,
  selectCurrentLanguage,
  selectUserInfo,
  selectUserLoggedIn,
  changeUserDataFetch,
  changeLanguage,
  selectUserFetching,
  logoutFetch,
} from 'web/src/modules';
import { MarketSelector } from 'web/src/containers/MarketSelector/MarketSelector';
import { HeaderToolbar } from 'web/src/containers/HeaderToolbar/HeaderToolbar';
import { useT } from 'web/src/hooks/useT';
import {
  RenderLinkComponent,
  RenderNavLinkComponent,
  UserLink,
  UserLinks,
} from 'web/src/components/shared/sharedTypes';
import { isToday, isYesterday, localeDate } from 'web/src/helpers';
import { useMarkNotificationAsRead } from 'web/src/hooks/mutations/useMarkNotificationAsRead';
import { NotificationModalNotification } from 'web/src/containers/NotificationModal/types';
import { useFetchP2PNotifications } from 'web/src/hooks/data/useFetchP2PNotifications';
import { NotificationModal } from 'web/src/containers/NotificationModal/NotificationModal';
import { Box } from 'web/src/components/ui/Box';
import { notificationInfo } from 'web/src/components/Header/notificationInfo';
import { NavigationLink } from 'web/src/components/shared/Header/NavigationLink';
import ChevronLeftIcon from 'web/src/assets/svg/ChevronLeftIcon.svg';
import { useNotificationSubscribe } from 'web/src/components/app/AppContext';
import { Notification } from 'web/src/lib/socket/types';

type Links = ComponentProps<typeof SharedHeader>['navLinks'];

const languages = {
  en: 'English',
  ru: 'Русский',
};

const strIncludesStrings = (str: string, substr: string[]): boolean => {
  return substr.some((s) => str.includes(s));
};

const Header: FC = () => {
  const [nofiticationModalProps, setNofiticationModalProps] = useState<
    NotificationModalNotification | undefined
  >();
  const t = useT();
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguage);
  const isLoggedIn = useSelector(selectUserLoggedIn);
  const user = useSelector(selectUserInfo);
  const colorTheme = useSelector(selectCurrentColorTheme);
  const isUserFetching = useSelector(selectUserFetching);
  const { pathname } = useLocation();
  const history = useHistory();
  const isTradingPage = pathname.includes('/trading');
  const p2pURL = '/p2p';
  const merchantClient = (user.bitzlato_user?.roles ?? []).includes('merchantClient');

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

  const { data: notifications = [], mutate: notificationsMutate } =
    useFetchP2PNotifications(isLoggedIn);

  const [markNotificationAsReadP2P] = useMarkNotificationAsRead();

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

  const handleMarkAllNotificationAsRead = () =>
    notifications.forEach((n) => {
      if (!n.read) {
        markNotificationAsReadP2P(n.id);
      }
    });

  const handleMarkNotificationAsRead = (notificationId: number) =>
    markNotificationAsReadP2P(notificationId);

  const handleLanguageChange = (code: string) => {
    if (isLoggedIn) {
      const data = user.data && JSON.parse(user.data);

      if (data && data.language && data.language !== code) {
        dispatch(
          changeUserDataFetch({
            user: {
              ...user,
              data: JSON.stringify({
                ...data,
                language: code,
              }),
            },
          }),
        );
      }
    }

    dispatch(changeLanguage(code));
  };
  const handleThemeChange = () =>
    dispatch(changeColorTheme(colorTheme === 'light' ? 'dark' : 'light'));

  const closeNotificationModal = () => setNofiticationModalProps(undefined);

  let userProps;
  if (isUserFetching) {
    userProps = { status: USER_STATUS_NOT_AUTHORIZED };
  } else if (!isLoggedIn) {
    userProps = {
      status: USER_STATUS_AUTHORIZATION_REQUIRED,
      onSignInClick: () => history.push('/signin'),
      onSignUpClick: () => history.push('/signup'),
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
        type: 'internal',
        to: '/profile/telegram',
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

    userProps = {
      status: USER_STATUS_AUTHORIZED,
      profileLink,
      userLinks,
      onLogoutClick: () => dispatch(logoutFetch()),
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
            if (strIncludesStrings(notify.link, ['/p2p', '/merch'])) {
              window.location.assign(notify.link);
            } else {
              history.push(notify.link);
            }
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

  const navLinks: Links = [
    {
      key: 'p2p',
      type: 'tab',
      link: {
        type: 'internal',
        to: p2pURL,
      },
      children: t('P2P'),
      tabs: [
        {
          key: 'Ad board',
          type: 'internal',
          to: p2pURL,
          children: t('AD Board'),
        },
        {
          key: 'My adverts',
          type: 'internal',
          to: `${p2pURL}/adverts`,
          children: t('My adverts'),
        },
        {
          key: 'My trades',
          type: 'internal',
          to: `${p2pURL}/trades`,
          children: t('My trades'),
        },
      ],
    },
    {
      key: 'exchange',
      type: 'tab',
      link: {
        type: 'internal',
        to: '/trading',
      },
      children: t('Exchange'),
      tabs: [
        {
          key: 'trading',
          type: 'internal',
          to: '/trading',
          children: t('page.header.navbar.trade'),
        },
        {
          key: 'orders',
          type: 'internal',
          to: '/orders',
          children: t('page.header.navbar.openOrders'),
        },
        {
          key: 'history',
          type: 'internal',
          to: '/history',
          children: t('page.header.navbar.history'),
        },
      ],
    },
    {
      key: 'quick-exchange',
      type: 'internal',
      to: '/quick-exchange',
      children: t('page.header.navbar.quick-exchange'),
    },
    {
      key: 'gifts',
      type: 'tab',
      link: {
        type: 'internal',
        to: '/gifts',
      },
      children: t('Gifts'),
      tabs: [
        {
          key: 'Create gift',
          type: 'internal',
          to: '/gifts',
          children: t('gifts.createGift'),
          exact: true,
        },
        {
          key: 'Active gifts',
          type: 'internal',
          to: '/gifts/active',
          children: t('gifts.activeGifts'),
          exact: true,
        },
        {
          key: 'Gifts history',
          type: 'internal',
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
      type: 'internal',
      to: '/wallets',
      children: t('page.header.navbar.balances'),
    },
  ];

  const renderLinkComponent: RenderLinkComponent = (props) => <Link {...props} />;
  const renderNavLinkComponent: RenderNavLinkComponent = (props) => (
    <NavLink
      isActive={(match, location) => {
        if (!match) {
          return false;
        }

        const partsOfLocation = location.pathname.split('/');

        if (match.url === p2pURL && partsOfLocation.includes('p2p')) {
          const [seoType] = location.pathname.split('-') ?? [];
          return Boolean(seoType?.endsWith('buy') || seoType?.endsWith('purchase'));
        }

        return match.isExact;
      }}
      {...props}
    />
  );

  return (
    <>
      {nofiticationModalProps && (
        <NotificationModal
          notification={nofiticationModalProps}
          handleClose={closeNotificationModal}
        />
      )}
      <SharedHeader
        backButton={
          isTradingPage ? (
            <NavigationLink
              variant="withIcon"
              link={{
                key: 'wallets',
                type: 'internal',
                to: '/wallets',
                children: (
                  <>
                    <ChevronLeftIcon />
                    <Box as="span" fontWeight="strong">
                      {t('Back')}
                    </Box>
                  </>
                ),
              }}
              renderNavLinkComponent={renderNavLinkComponent}
            />
          ) : undefined
        }
        logoLightURL={window.env.logoUrl}
        logoDarkURL={window.env.logoDarkUrl}
        toMainPage={p2pURL}
        theme={colorTheme}
        language={language}
        languages={languages}
        navLinks={navLinks}
        rightNavLinks={rightNavLinks}
        pathname={pathname}
        t={translate}
        renderLinkComponent={renderLinkComponent}
        renderNavLinkComponent={renderNavLinkComponent}
        {...userProps}
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      >
        {isTradingPage && (
          <Box
            display={{ mobile: 'none', tablet: 'flex' }}
            alignItems="center"
            justifyContent="space-between"
          >
            <MarketSelector />
            <HeaderToolbar />
          </Box>
        )}
      </SharedHeader>
    </>
  );
};

export default Header;
