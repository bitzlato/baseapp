import { createBrowserHistory } from 'history';
import * as React from 'react';
import cn from 'classnames';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { Router } from 'react-router';
import { getThemeClassName } from 'web/src/theme/getThemeClassName';
import { useFetchPublicFeatures } from 'web/src/hooks/data/barong/useFetchPublicFeatures';
import { Adapter } from 'web/src/components/shared/Adapter';
import { Link, useHistory } from 'react-router-dom';
import { useNewTradeNotifyWithSound } from 'web/src/hooks/useNewTradeNotifySound';
import { useEffect } from 'react';
import { toggleColorTheme } from 'web/src/helpers/toggleColorTheme';
import { WalletsFetching } from 'web/src/components/app/WalletsFetching';
import { EmailVerification } from 'web/src/components/user/EmailVerification';
import { Freezed } from 'web/src/components/app/Freezed';
import { SecurityVerification } from 'web/src/components/app/SecurityVerification';
import { useFetchUser } from 'web/src/hooks/useFetchUser';
import { ExpiredSession } from 'web/src/components/app/ExpiredSession';
import { ListensForLogin } from 'web/src/components/app/ListenLogout';
import { useSetMobileDevice } from './hooks';
import { selectCurrentColorTheme, selectCurrentLanguage, selectMobileDeviceState } from './modules';
import { languageMap } from './translations';
import { ErrorBoundary } from './containers/ErrorBoundary/ErrorBoundary';
import { lazyRetry } from './helpers/lazyRetry';
import { DeeplinkAlertProvider } from './containers/DeeplinkAlert/DeeplinkAlertContext';
import { DeeplinkAlertModal } from './containers/DeeplinkAlert/DeeplinkAlertModal';
import './global.css';

const browserHistory = createBrowserHistory();

const Routes = lazyRetry(() =>
  import('./components/app/routes/SwitchRoutes').then(({ SwitchRoutes }) => ({
    default: SwitchRoutes,
  })),
);
const Header = lazyRetry(() => import('./components/Header/Header'));
const AlertsContainer = lazyRetry(() =>
  import('./containers/Alerts').then(({ Alerts }) => ({ default: Alerts })),
);
const FooterContainer = lazyRetry(() =>
  import('./containers/Footer/Footer').then(({ Footer }) => ({ default: Footer })),
);

const Body = () => {
  const history = useHistory();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const theme = useSelector(selectCurrentColorTheme);

  useEffect(() => {
    toggleColorTheme(theme);
  }, [theme]);

  return (
    <DeeplinkAlertProvider>
      <Adapter Link={Link} history={history}>
        <div className={cn(isMobileDevice && 'pg-mobile-app', getThemeClassName(theme))}>
          <Header />
          <DeeplinkAlertModal />
          <AlertsContainer />
          <EmailVerification />
          <Routes />
          <FooterContainer />
          <WalletsFetching />
          <Freezed />
          <SecurityVerification />
          <ExpiredSession />
          <ListensForLogin />
        </div>
      </Adapter>
    </DeeplinkAlertProvider>
  );
};

export const App = () => {
  useSetMobileDevice();
  useFetchUser(); // load user
  useFetchPublicFeatures(); // load public features
  useNewTradeNotifyWithSound(); // add sound notify on new trade

  const lang = useSelector(selectCurrentLanguage);

  return (
    <IntlProvider locale={lang} messages={languageMap[lang]} key={lang}>
      <Router history={browserHistory}>
        <ErrorBoundary>
          <React.Suspense fallback={null}>
            <Body />
          </React.Suspense>
        </ErrorBoundary>
      </Router>
    </IntlProvider>
  );
};
