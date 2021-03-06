import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactGA from 'react-ga';
import cn from 'classnames';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { Router } from 'react-router';
import { getThemeClassName } from 'web/src/theme/getThemeClassName';
import { useFetchPublicFeatures } from 'web/src/hooks/data/barong/useFetchPublicFeatures';
import { gaTrackerKey } from './api';
import { useSetMobileDevice } from './hooks';
import * as mobileTranslations from './mobile/translations';
import { selectCurrentColorTheme, selectCurrentLanguage, selectMobileDeviceState } from './modules';
import { languageMap } from './translations';
import { ErrorBoundary } from './containers/ErrorBoundary/ErrorBoundary';
import { Language } from './types';
import { lazyRetry } from './helpers/lazyRetry';
import { useNotificator } from './hooks/useNotificator';

const gaKey = gaTrackerKey();
const browserHistory = createBrowserHistory();

if (gaKey) {
  ReactGA.initialize(gaKey);
  browserHistory.listen((location) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });
}

const Header = lazyRetry(() => import('./components/Header/Header'));

/* Desktop components */
const AlertsContainer = lazyRetry(() =>
  import('./containers/Alerts').then(({ Alerts }) => ({ default: Alerts })),
);
const LayoutContainer = lazyRetry(() =>
  import('./routes').then(({ Layout }) => ({ default: Layout })),
);
const FooterContainer = lazyRetry(() =>
  import('./containers/Footer/Footer').then(({ Footer }) => ({ default: Footer })),
);

const getTranslations = (lang: Language, isMobileDevice: boolean) => {
  if (isMobileDevice) {
    return {
      ...languageMap[lang],
      ...mobileTranslations[lang],
    };
  }

  return languageMap[lang];
};

const RenderDeviceContainers = () => {
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const theme = useSelector(selectCurrentColorTheme);
  const className = getThemeClassName(theme);

  if (!isMobileDevice) {
    return (
      <div className={className}>
        <Header />
        <AlertsContainer />
        <LayoutContainer />
        <FooterContainer />
      </div>
    );
  }

  return (
    <div className={cn('pg-mobile-app', className)}>
      <Header />
      <AlertsContainer />
      <LayoutContainer />
      <FooterContainer />
    </div>
  );
};

export const App = () => {
  useSetMobileDevice();
  useNotificator();
  useFetchPublicFeatures(); // load public features

  const lang = useSelector(selectCurrentLanguage);
  const isMobileDevice = useSelector(selectMobileDeviceState);

  return (
    <IntlProvider locale={lang} messages={getTranslations(lang, isMobileDevice)} key={lang}>
      <Router history={browserHistory}>
        <ErrorBoundary>
          <React.Suspense fallback={null}>
            <RenderDeviceContainers />
          </React.Suspense>
        </ErrorBoundary>
      </Router>
    </IntlProvider>
  );
};
