import { ComponentProps, FC } from 'react';
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
  RootState,
  selectCurrentColorTheme,
  selectCurrentLanguage,
  selectUserInfo,
  selectUserLoggedIn,
  changeUserDataFetch,
  changeLanguage,
  selectUserFetching,
  logoutFetch,
} from 'src/modules';
import { MarketSelector } from 'src/containers/MarketSelector/MarketSelector';
import { HeaderToolbar } from 'src/containers/HeaderToolbar/HeaderToolbar';
import { useT } from 'src/hooks/useT';
import { getLinkToP2P } from 'web/src/components/Header/getLinkToP2P';
import { Navigation } from 'web/src/components/shared/Header/Navigation';
import { RenderLinkComponent, RenderNavLinkComponent } from 'web/src/components/shared/sharedTypes';
import { Box } from 'web/src/components/ui/Box';

type Links = ComponentProps<typeof SharedHeader>['navLinks'];

const languages = {
  en: 'English',
  ru: 'Русский',
};

const Header: FC = () => {
  const t = useT();
  const dispatch = useDispatch();
  const { currentCode, isLoggedIn, user } = useSelector((state: RootState) => ({
    currentCode: selectCurrentLanguage(state),
    isLoggedIn: selectUserLoggedIn(state),
    user: selectUserInfo(state),
  }));
  const colorTheme = useSelector(selectCurrentColorTheme);
  const isUserFetching = useSelector(selectUserFetching);
  const { pathname } = useLocation();
  const history = useHistory();
  const isTradingPage = pathname.includes('/trading');

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
    userProps = {
      status: USER_STATUS_AUTHORIZED,
      onLogoutClick: () => dispatch(logoutFetch()),
    };
  }

  const p2pURL = getLinkToP2P(currentCode);
  const p2p: Links = [
    {
      key: 'p2p',
      type: 'external',
      to: p2pURL,
      children: t('page.header.navbar.toP2P'),
    },
  ];
  const navLinks = [
    {
      key: 'quick-exchange',
      type: 'internal',
      to: '/quick-exchange',
      children: t('page.header.navbar.quick-exchange'),
    },
    {
      key: 'trading',
      type: 'internal',
      to: '/trading',
      children: t('page.header.navbar.trade'),
    },
    userProps.status === USER_STATUS_AUTHORIZED
      ? {
          key: 'wallets',
          type: 'internal',
          to: '/wallets',
          children: t('page.header.navbar.wallets'),
        }
      : undefined,
    userProps.status === USER_STATUS_AUTHORIZED
      ? {
          key: 'orders',
          type: 'internal',
          to: '/orders',
          children: t('page.header.navbar.openOrders'),
        }
      : undefined,
    userProps.status === USER_STATUS_AUTHORIZED
      ? {
          key: 'history',
          type: 'internal',
          to: '/history',
          children: t('page.header.navbar.history'),
        }
      : undefined,
    ...p2p,
  ].filter(Boolean) as Links;

  const hamburgerLinks = [
    userProps.status === USER_STATUS_AUTHORIZED
      ? {
          key: 'profile',
          type: 'internal',
          icon: 'profile',
          to: '/profile',
          children: t('page.header.navbar.profile'),
        }
      : undefined,
    userProps.status === USER_STATUS_AUTHORIZATION_REQUIRED
      ? {
          key: 'signin',
          icon: 'profile',
          children: t('page.header.navbar.signIn'),
          onClick: userProps.onSignInClick,
        }
      : undefined,
    userProps.status === USER_STATUS_AUTHORIZATION_REQUIRED
      ? {
          key: 'signup',
          icon: 'signup',
          children: t('page.header.signUp'),
          onClick: userProps.onSignUpClick,
        }
      : undefined,
    {
      key: 'quickExchange',
      type: 'internal',
      icon: 'quickExchange',
      to: '/quick-exchange',
      children: t('page.header.navbar.quick-exchange'),
    },
    {
      key: 'trading',
      type: 'internal',
      icon: 'trading',
      to: '/trading',
      children: t('page.header.navbar.trade'),
    },
    userProps.status === USER_STATUS_AUTHORIZED
      ? {
          key: 'wallets',
          type: 'internal',
          icon: 'wallets',
          to: '/wallets',
          children: t('page.header.navbar.wallets'),
        }
      : undefined,
    userProps.status === USER_STATUS_AUTHORIZED
      ? {
          key: 'orders',
          type: 'internal',
          icon: 'orders',
          to: '/orders',
          children: t('page.header.navbar.openOrders'),
        }
      : undefined,
    userProps.status === USER_STATUS_AUTHORIZED
      ? {
          key: 'history',
          type: 'internal',
          icon: 'history',
          to: '/history',
          children: t('page.header.navbar.history'),
        }
      : undefined,
    {
      key: 'p2p',
      type: 'external',
      icon: 'p2p',
      to: p2pURL,
      children: t('page.header.navbar.toP2P'),
    },
    {
      key: 'docs',
      type: 'internal',
      icon: 'api',
      to: '/docs',
      children: t('page.header.navbar.api'),
    },
    {
      key: 'logout',
      icon: 'logout',
      children: t('page.body.profile.content.action.logout'),
      onClick: userProps.onLogoutClick,
    },
  ].filter(Boolean) as Links;

  const translate = (key: string) => {
    switch (key) {
      case 'signIn':
        return t('page.header.navbar.signIn');

      case 'signUp':
        return t('page.header.signUp');

      case 'profile':
        return t('page.header.navbar.profile');

      case 'logout':
        return t('page.body.profile.content.action.logout');

      case 'theme':
        return t('page.mobile.profileLinks.settings.theme');

      default:
        throw new Error(`translate: Key '${key}' not found`);
    }
  };

  const renderLinkComponent: RenderLinkComponent = (props) => <Link {...props} />;
  const renderNavLinkComponent: RenderNavLinkComponent = (props) => <NavLink {...props} />;

  return (
    <SharedHeader
      logoLightURL={window.env.logoUrl}
      logoDarkURL={window.env.logoDarkUrl}
      toMainPage={p2pURL}
      theme={colorTheme}
      language={currentCode}
      languages={languages}
      navLinks={navLinks}
      hamburgerLinks={hamburgerLinks}
      t={translate}
      renderLinkComponent={renderLinkComponent}
      renderNavLinkComponent={renderNavLinkComponent}
      {...userProps}
      onThemeChange={handleThemeChange}
      onLanguageChange={handleLanguageChange}
    >
      {isTradingPage && (
        <>
          <Box mr="6x">
            <Navigation navLinks={p2p} renderNavLinkComponent={renderNavLinkComponent} />
          </Box>
          <MarketSelector />
          <HeaderToolbar />
        </>
      )}
    </SharedHeader>
  );
};

export default Header;
