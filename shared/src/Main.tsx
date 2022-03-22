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
import { Button } from 'shared/Button';
import { Links, Notify, IconName } from 'shared/types';
import { Language, Theme } from 'web/src/types';

const MARKET_URL = 'https://market.bitzlato.com' as const;
const P2P_URL = 'https://bitzlato.com/en/p2p' as const;

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

  let userProps;
  if (status === USER_STATUS_AUTHORIZATION_REQUIRED) {
    userProps = {
      status: USER_STATUS_AUTHORIZATION_REQUIRED,
      onSignInClick: handleSignInClick,
      onSignUpClick: handleSignUpClick,
    };
  } else if (status === USER_STATUS_AUTHORIZED) {
    userProps = {
      status: USER_STATUS_AUTHORIZED,
      onLogoutClick: handleLogoutClick,
    };
  } else {
    userProps = { status: USER_STATUS_NOT_AUTHORIZED };
  }

  const navLinks = [
    {
      key: 'quick-exchange',
      type: 'internal',
      to: '/quick-exchange',
      children: language === 'ru' ? 'Быстрый обмен' : 'Quick Exchange',
    },
    {
      key: 'trading',
      type: 'internal',
      to: '/trading',
      children: language === 'ru' ? 'Торговля' : 'Trade',
    },
    status === USER_STATUS_AUTHORIZED
      ? {
          key: 'wallets',
          type: 'internal',
          to: '/wallets',
          children: language === 'ru' ? 'Кошельки' : 'Wallets',
        }
      : undefined,
    status === USER_STATUS_AUTHORIZED
      ? {
          key: 'orders',
          type: 'internal',
          to: '/orders',
          children: language === 'ru' ? 'Ордера' : 'Orders',
        }
      : undefined,
    status === USER_STATUS_AUTHORIZED
      ? {
          key: '/trading',
          type: 'internal',
          to: '/history',
          children: language === 'ru' ? 'История' : 'History',
        }
      : undefined,
    {
      key: P2P_URL,
      type: 'external',
      to: P2P_URL,
      children: language === 'ru' ? 'P2P Торговля' : 'P2P Trading',
    },
  ].filter(Boolean) as Links;

  const hamburgerLinks = [
    status === USER_STATUS_AUTHORIZED
      ? {
          key: 'profile',
          type: 'internal',
          icon: 'profile' as IconName,
          to: '/profile',
          children: language === 'ru' ? 'Профиль' : 'Profile',
        }
      : undefined,
    status === USER_STATUS_AUTHORIZATION_REQUIRED
      ? {
          key: 'signin',
          icon: 'profile' as IconName,
          children: language === 'ru' ? 'Войти' : 'Sign In',
          onClick: handleSignInClick,
        }
      : undefined,
    status === USER_STATUS_AUTHORIZATION_REQUIRED
      ? {
          key: 'signup',
          icon: 'signup' as IconName,
          children: language === 'ru' ? 'Регистрация' : 'Sign Up',
          onClick: handleSignUpClick,
        }
      : undefined,
    {
      key: 'quickExchange',
      type: 'internal',
      icon: 'quickExchange' as IconName,
      to: '/quick-exchange',
      children: language === 'ru' ? 'Быстрый обмен' : 'Quick Exchange',
    },
    {
      key: 'trading',
      type: 'internal',
      icon: 'trading' as IconName,
      to: '/trading',
      children: language === 'ru' ? 'Торговля' : 'Trade',
    },
    status === USER_STATUS_AUTHORIZED
      ? {
          key: 'wallets',
          type: 'internal',
          icon: 'wallets' as IconName,
          to: '/wallets',
          children: language === 'ru' ? 'Кошельки' : 'Wallets',
        }
      : undefined,
    status === USER_STATUS_AUTHORIZED
      ? {
          key: 'orders',
          type: 'internal',
          icon: 'orders' as IconName,
          to: '/orders',
          children: language === 'ru' ? 'Ордера' : 'Orders',
        }
      : undefined,
    status === USER_STATUS_AUTHORIZED
      ? {
          key: 'history',
          type: 'internal',
          icon: 'history' as IconName,
          to: '/history',
          children: language === 'ru' ? 'История' : 'History',
        }
      : undefined,
    {
      key: 'p2p',
      type: 'external',
      icon: 'p2p' as IconName,
      to: P2P_URL,
      children: language === 'ru' ? 'P2P Торговля' : 'P2P Trading',
    },
    {
      key: 'docs',
      type: 'internal',
      icon: 'api' as IconName,
      to: '/docs',
      children: language === 'ru' ? 'API Документация' : 'API Documentation',
    },
    {
      key: 'logout',
      icon: 'logout' as IconName,
      children: language === 'ru' ? 'Выйти' : 'Logout',
      onClick: handleLogoutClick,
    },
  ].filter(Boolean) as Links;

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

      case 'all_read':
        return language === 'ru' ? 'Пометить всё как прочитанное' : 'Mark everything as read';

      case 'adverts':
        return 'My Adverts';

      default:
        throw new Error(`t: Key '${key}' not found`);
    }
  };

  const navLinks2: Links = [
    {
      key: 'main',
      type: 'internal',
      to: '/',
      children: 'P2P',
    },
    {
      key: 'market',
      type: 'external',
      to: MARKET_URL,
      children: language === 'ru' ? 'Биржа' : 'Exchange',
    },
    {
      key: 'knowledgebase',
      type: 'external',
      to: 'https://bitzlato.com/knowledgebase',
      children: language === 'ru' ? 'Поддержка' : 'Support',
    },
  ];

  const hamburgerLinks2: Links = [
    {
      key: 'main',
      type: 'internal',
      icon: 'p2p',
      to: '/',
      children: 'P2P',
    },
    {
      key: 'market',
      type: 'external',
      icon: 'trading',
      to: MARKET_URL,
      children: language === 'ru' ? 'Биржа' : 'Exchange',
    },
    {
      key: 'knowledgebase',
      type: 'external',
      icon: 'question',
      to: 'https://bitzlato.com/knowledgebase',
      children: language === 'ru' ? 'Поддержка' : 'Support',
    },
  ];

  const userLinks: Links = [
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

  const handleNotifyClick = () => console.log('Notify clicked');
  const notifications: Notify[] = [
    {
      id: '1',
      message:
        'Ваш вывод на адрес ASASASASASAsadasdasdas3434324234 на сумму $cryptocurrency $crypto, включая комиссию $commission $crypto, отменен. Монеты зачислены на баланс вашего кошелька, повторите попытку вывода в случае необходимости!',
      date: '19 янв. 2022 г., 16:16',
      read: false,
      onClick: handleNotifyClick,
    },
    {
      id: '2',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г., 16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '3',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г., 16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '4',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г., 16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '5',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г., 16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '6',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г., 16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '7',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г., 16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '8',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г., 16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '9',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г., 16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '10',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г., 16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '11',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г., 16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '12',
      message: 'Вы получили 0.01234567 BTC (999 999,99 RUB) от ThinJohnTheThree!',
      date: '19 янв. 2022 г., 16:16',
      read: true,
      onClick: handleNotifyClick,
    },
    {
      id: '13',
      message: `⚠️ У вас есть 1 ваучер(а) на бесплатный вывод который(е) сгорают через 3 дня.

      🔥 Самое время ими воспользоваться и не потерять шанс бесплатного вывода монет!`,
      date: '18 янв. 2022 г., 16:16',
      read: true,
      onClick: handleNotifyClick,
    },
  ];
  const handleAllRead = () => console.log('all read');

  let userProps2;
  if (status === USER_STATUS_AUTHORIZED) {
    userProps2 = {
      ...userProps,
      user: {
        username: 'PureJesseTheWolf',
        userpic:
          'https://www.gravatar.com/avatar/3dfe4fa2f9b94c93ad5af34cd33011bc?s=640&d=identicon',
      },
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
        logoLightURL="https://market.bitzlato.com/assets/bitzlato_logo--sm--blue--nav.svg"
        logoDarkURL="https://market.bitzlato.com/assets/bitzlato_logo--sm--white--nav.svg"
        theme={theme}
        language={language}
        languages={languages}
        navLinks={navLinks}
        hamburgerLinks={hamburgerLinks}
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
        logoLightURL="https://market.bitzlato.com/assets/bitzlato_logo--sm--blue--nav.svg"
        logoDarkURL="https://market.bitzlato.com/assets/bitzlato_logo--sm--white--nav.svg"
        toMainPage="/"
        toAdvertsPage="/adverts"
        theme={theme}
        language={language}
        languages={languages2}
        navLinks={navLinks2}
        hamburgerLinks={hamburgerLinks2}
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
        enableMobileMenu
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      />

      <Heading level={1}>Footer:</Heading>
      <Footer
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
