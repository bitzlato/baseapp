import { FC, useEffect, useState } from 'react';
import { getThemeClassName } from 'shared/getThemeClassName';
import { Text } from 'shared/Text';
import { Heading } from 'shared/Heading';
import {
  Header,
  USER_STATUS_NOT_AUTHORIZED,
  USER_STATUS_AUTHORIZATION_REQUIRED,
  USER_STATUS_AUTHORIZED,
} from 'shared/Header';
import { Footer } from 'shared/Footer';
import { MobileFooter } from 'shared/MobileFooter';
import { Button } from 'shared/Button';
import { Links, Notify, BottomTabLink, UserLinks, UserLink } from 'shared/types';
import { Language, Theme } from 'web/src/types';

const MARKET_URL = 'https://market.bitzlato.com';
const P2Plinks = { en: 'https://bitzlato.com/en/p2p', ru: 'https://bitzlato.com/ru/p2p' };

const languages = {
  en: 'English',
  ru: 'Русский',
};
const languages2 = {
  en: 'English',
  ru: 'Русский',
  ar: 'العربية',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
  zh: '汉语',
};

const Main: FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const handleThemeChange = (nextTheme: Theme) => {
    setTheme(nextTheme);
  };

  const [language, setLanguage] = useState<Language>('en');
  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
  };

  const [status, setStatus] = useState<
    | typeof USER_STATUS_NOT_AUTHORIZED
    | typeof USER_STATUS_AUTHORIZATION_REQUIRED
    | typeof USER_STATUS_AUTHORIZED
  >('not_authorized');
  const handleSignInClick = () => {
    setStatus('authorized');
  };
  const handleSignUpClick = () => {
    setStatus('authorized');
  };
  const handleLogoutClick = () => {
    setStatus('authorization_required');
  };

  useEffect(() => {
    setTimeout(() => {
      setStatus('authorization_required');
    }, 1000);
  }, []);

  const t = (key: string) => {
    switch (key) {
      case 'signIn':
        return language === 'ru' ? 'Войти' : 'Sign In';

      case 'signUp':
        return language === 'ru' ? 'Регистрация' : 'Sign Up';

      case 'profile':
        return language === 'ru' ? 'Профиль' : 'Profile';

      case 'logout':
        return language === 'ru' ? 'Выйти' : 'Logout';

      case 'theme':
        return language === 'ru' ? 'Тема' : 'Theme';

      case 'notifications_empty':
        return language === 'ru' ? 'Нет уведомлений' : 'No notifications';

      case 'darkTheme':
      case 'notificationsTitle':
      case 'notificationRead':
      case 'notificationUnread':
        return key;

      case 'p2p':
      case 'AD Board':
      case 'My adverts':
      case 'My trades':
      case 'Exchange':
      case 'Trade':
      case 'Orders':
      case 'History':
      case 'Quick exchange':
        return key;

      case 'bottomTabs.home':
      case 'bottomTabs.exchange':
      case 'bottomTabs.trading':
      case 'bottomTabs.wallets':
      case 'bottomTabs.p2p':
        return key.split('.')[1] || key;

      default:
        throw new Error(`translate: Key '${key}' not found`);
    }
  };

  let userProps;
  if (status === USER_STATUS_AUTHORIZATION_REQUIRED) {
    userProps = {
      status: USER_STATUS_AUTHORIZATION_REQUIRED,
      onSignInClick: handleSignInClick,
      onSignUpClick: handleSignUpClick,
    };
  } else if (status === USER_STATUS_AUTHORIZED) {
    const profileLink: UserLink = {
      key: 'profile',
      type: 'external',
      to: '/profile',
      icon: 'profile',
      children: t('profile'),
    };

    const userLinks: UserLinks = [
      {
        key: 'telegram',
        type: 'internal',
        to: '/profile/telegram',
        children: 'Telegram',
      },
    ];

    userProps = {
      profileLink,
      userLinks,
      status: USER_STATUS_AUTHORIZED,
      onLogoutClick: handleLogoutClick,
    };
  } else {
    userProps = { status: USER_STATUS_NOT_AUTHORIZED };
  }

  const p2pURL = P2Plinks[language] ?? P2Plinks.en;
  const marketURL = MARKET_URL;

  const navLinksMarket: Links = [
    {
      key: 'p2p',
      type: 'tab',
      children: t('p2p'),
      tabs: [
        {
          key: 'Ad board',
          type: 'external',
          to: `/${p2pURL}/sell-btc-rub`,
          children: t('AD Board'),
        },
        {
          key: 'My adverts',
          type: 'external',
          to: `/${p2pURL}/adverts`,
          children: t('My adverts'),
        },
        {
          key: 'My trades',
          type: 'external',
          to: `/${p2pURL}/trades`,
          children: t('My trades'),
        },
      ],
    },
    {
      key: 'exchange',
      type: 'tab',
      children: t('Exchange'),
      tabs: [
        {
          key: 'trading',
          type: 'internal',
          to: '/trading',
          children: t('Trade'),
        },
        {
          key: 'orders',
          type: 'internal',
          to: '/orders',
          children: t('Orders'),
        },
        {
          key: 'history',
          type: 'internal',
          to: '/history',
          children: t('History'),
        },
      ],
    },
    {
      key: 'quick-exchange',
      type: 'internal',
      to: '/quick-exchange',
      children: t('Quick exchange'),
    },
  ];

  const navLinksP2P: Links = [
    {
      key: 'p2p',
      type: 'tab',
      children: t('p2p'),
      tabs: [
        {
          key: 'Ad board',
          type: 'internal',
          to: `/${p2pURL}/sell-btc-rub`,
          children: t('AD Board'),
        },
        {
          key: 'My adverts',
          type: 'internal',
          to: `/${p2pURL}/adverts`,
          children: t('My adverts'),
        },
        {
          key: 'My trades',
          type: 'internal',
          to: `/${p2pURL}/trades`,
          children: t('My trades'),
        },
      ],
    },
    {
      key: 'exchange',
      type: 'tab',
      children: t('Exchange'),
      tabs: [
        {
          key: 'trading',
          type: 'external',
          to: `${marketURL}/trading`,
          children: t('Trade'),
        },
        {
          key: 'orders',
          type: 'external',
          to: `${marketURL}/orders`,
          children: t('Orders'),
        },
        {
          key: 'history',
          type: 'external',
          to: `${marketURL}/history`,
          children: t('History'),
        },
      ],
    },
    {
      key: 'quick-exchange',
      type: 'external',
      to: `${marketURL}/quick-exchange`,
      children: t('Quick exchange'),
    },
  ];

  const userLinks: UserLinks = [
    {
      key: 'wallets',
      type: 'internal',
      to: '/wallets',
      children: 'My wallets',
    },
    {
      key: 'profile',
      type: 'internal',
      to: '/profile',
      children: 'My profile',
    },
    {
      key: 'referral',
      type: 'internal',
      to: '/profile/referral',
      children: 'Referral',
    },
    {
      key: 'telegram',
      type: 'internal',
      to: '/profile/telegram',
      children: 'Telegram',
    },
    {
      key: 'reports',
      type: 'internal',
      to: '/profile/reports',
      children: 'Reports',
    },
    {
      key: 'workspace',
      type: 'internal',
      to: '/trader-workspace',
      children: 'Workspace',
    },
  ];

  const BOTTOM_TABS: BottomTabLink[] = [
    {
      to: '/',
      type: 'internal',
      exact: true,
      title: t('bottomTabs.home'),
      icon: 'home',
    },
    {
      to: '/quick-exchange',
      type: 'internal',
      icon: 'exchange',
      title: t('bottomTabs.exchange'),
    },
    {
      to: '/trading',
      type: 'internal',
      icon: 'trading',
      title: t('bottomTabs.trading'),
    },
    {
      to: '/wallets',
      type: 'internal',
      icon: 'wallets',
      title: t('bottomTabs.wallets'),
    },
    {
      to: p2pURL,
      type: 'external',
      icon: 'p2p',
      title: t('bottomTabs.p2p'),
    },
  ];

  const handleNotifyClick = () => console.log('Notify clicked');

  const notifications: Notify[] = [
    {
      id: '1',
      message:
        'Ваш вывод на адрес ASASASASASAsadasdasdas3434324234 на сумму $cryptocurrency $crypto, включая комиссию $commission $crypto, отменен. Монеты зачислены на баланс вашего кошелька, повторите попытку вывода в случае необходимости!',
      date: '19 янв. 2022 г.',
      time: '16:16',
      read: false,
      onClick: handleNotifyClick,
    },
    {
      id: '2',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г.',
      time: '16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '3',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г.',
      time: '16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '4',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г.',
      time: '16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '5',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г.',
      time: '16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '6',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г.',
      time: '16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '7',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г.',
      time: '16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '8',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г.',
      time: '16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '9',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г.',
      time: '16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '10',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г.',
      time: '16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '11',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г.',
      time: '16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '12',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г.',
      time: '16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '13',
      message: `⚠️ У вас есть 1 ваучер(а) на бесплатный вывод который(е) сгорают через 3 дня.

      🔥 Самое время ими воспользоваться и не потерять шанс бесплатного вывода монет!`,
      date: '18 янв. 2022 г., 16:16',
      time: '16:16',
      read: true,
      onClick: handleNotifyClick,
    },
  ];

  const handleAllRead = () => console.log('all read');

  let userProps2;
  if (status === USER_STATUS_AUTHORIZED) {
    const profileLink: UserLink = {
      key: 'profile',
      type: 'external',
      to: '/profile',
      icon: 'profile',
      children: t('page.header.navbar.profile'),
    };

    userProps2 = {
      ...userProps,
      user: {
        username: 'PureJesseTheWolf',
        userpic:
          'https://www.gravatar.com/avatar/3dfe4fa2f9b94c93ad5af34cd33011bc?s=640&d=identicon',
      },
      profileLink,
      userLinks,
      notifications,
      handleAllRead,
    };
  } else {
    userProps2 = userProps;
  }

  return (
    <div className={getThemeClassName(theme)}>
      <Heading level={1}>MARKET:</Heading>
      <Header
        logoLightURL="https://bitzlato.com/basestatic/bitzlato_logo--sm--blue--nav.svg"
        logoDarkURL="https://bitzlato.com/basestatic/bitzlato_logo--sm--white--nav.svg"
        theme={theme}
        language={language}
        languages={languages}
        navLinks={navLinksMarket}
        t={t}
        renderNavLinkComponent={({ key, className, to, children, onClick }) => {
          return (
            <a key={key} className={className} href={to} onClick={onClick}>
              {children}
            </a>
          );
        }}
        renderLinkComponent={({ key, className, to, children }) => {
          return (
            <a key={key} className={className} href={to}>
              {children}
            </a>
          );
        }}
        {...userProps}
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      />

      <Heading level={1}>P2P:</Heading>
      <Header
        logoLightURL="https://bitzlato.com/basestatic/bitzlato_logo--sm--blue--nav.svg"
        logoDarkURL="https://bitzlato.com/basestatic/bitzlato_logo--sm--white--nav.svg"
        toMainPage="/"
        theme={theme}
        language={language}
        languages={languages2}
        navLinks={navLinksP2P}
        t={t}
        renderNavLinkComponent={({ key, className, to, children, onClick }) => {
          return (
            <a key={key} className={className} href={to} onClick={onClick}>
              {children}
            </a>
          );
        }}
        renderLinkComponent={({ key, className, to, children }) => {
          return (
            <a key={key} className={className} href={to}>
              {children}
            </a>
          );
        }}
        {...userProps2}
        beta={false}
        hamburgerShowOnlyTablet
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      />

      <Heading level={1}>Footer:</Heading>
      <Footer
        logoURL={window.env.logoDarkUrl}
        theme={theme}
        language={language}
        renderMarketLink={({ key, className, to, children }) => {
          return (
            <a key={key} className={className} href={to}>
              {children}
            </a>
          );
        }}
      />

      <Heading level={1}>Mobile Footer:</Heading>
      <MobileFooter
        theme={theme}
        tabLinks={BOTTOM_TABS}
        renderNavLinkComponent={({ key, className, to, children, onClick }) => {
          return (
            <a key={key} className={className} href={to} onClick={onClick}>
              {children}
            </a>
          );
        }}
      />

      <Heading level={1}>Buttons:</Heading>
      <p>
        <Button size="small">Primary Small</Button>
        <Button>Primary Medium (Default)</Button>
        <Button size="large">Primary Large</Button>
        <Button disabled>Primary Disabled</Button>
      </p>
      <p>
        <Button color="secondary" size="small">
          Secondary Small
        </Button>
        <Button color="secondary">Secondary Medium</Button>
        <Button color="secondary" size="large">
          Secondary Large
        </Button>
        <Button color="secondary" disabled>
          Secondary Disabled
        </Button>
      </p>
      <p>
        <Button variant="outlined" size="small">
          Outlined Primary
        </Button>
        <Button variant="outlined">Outlined Primary</Button>
        <Button variant="outlined" size="large">
          Outlined Primary
        </Button>
        <Button variant="outlined" disabled>
          Outlined Primary Disabled
        </Button>
      </p>
      <p>
        <Button variant="outlined" color="secondary" size="small">
          Outlined Secondary
        </Button>
        <Button variant="outlined" color="secondary">
          Outlined Secondary
        </Button>
        <Button variant="outlined" color="secondary" size="large">
          Outlined Secondary
        </Button>
        <Button variant="outlined" color="secondary" disabled>
          Outlined Secondary Disabled
        </Button>
      </p>
      <p>
        <Button fullWidth>FULL WIDTH</Button>
      </p>
      <p>
        <Button variant="outlined" fullWidth>
          Outlined FULL WIDTH
        </Button>
      </p>

      <Heading level={1}>Texts:</Heading>
      <Text variant="lead">lead. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
      <Text variant="title" gutterBottom>
        title. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Text>
      <Text variant="label" gutterBottom>
        label. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Text>
      <Text>body. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
      <Text color="textMuted" variant="caption">
        caption. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Text>

      <Text variant="h4">h4. Heading</Text>
      <Text color="success" gutterBottom>
        body. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Text>
      <Text color="danger" gutterBottom>
        body. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Text>

      <Heading level={1}>Heading:</Heading>
      <Heading level={1} as="div">
        h1. Heading
      </Heading>
      <Heading level={2} as="div">
        h2. Heading
      </Heading>
      <Heading level={3} as="div">
        h3. Heading
      </Heading>
      <Heading level={4} as="div">
        h4. Heading
      </Heading>
      <Heading level={5} as="div">
        h5. Heading
      </Heading>
      <Heading level={6} as="div">
        h6. Heading
      </Heading>
    </div>
  );
};

export default Main;
