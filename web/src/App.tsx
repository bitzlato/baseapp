import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactGA from 'react-ga';
import cn from 'classnames';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { Router } from 'react-router';
import { getThemeClassName } from 'web/src/theme/getThemeClassName';
import { useFetchPublicFeatures } from 'web/src/hooks/data/barong/useFetchPublicFeatures';
import { Adapter } from 'web/src/components/shared/Adapter';
import { Link, useHistory } from 'react-router-dom';
import { gaTrackerKey } from './api';
import { useSetMobileDevice } from './hooks';
import { selectCurrentColorTheme, selectCurrentLanguage, selectMobileDeviceState } from './modules';
import { languageMap } from './translations';
import { ErrorBoundary } from './containers/ErrorBoundary/ErrorBoundary';
import { lazyRetry } from './helpers/lazyRetry';

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

const RenderDeviceContainers = () => {
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const theme = useSelector(selectCurrentColorTheme);
  const className = getThemeClassName(theme);

  const history = useHistory();

  let body;
  if (!isMobileDevice) {
    body = (
      <div className={className}>
        <Header />
        <AlertsContainer />
        <LayoutContainer />
        <FooterContainer />
      </div>
    );
  } else {
    body = (
      <div className={cn('pg-mobile-app', className)}>
        <Header />
        <AlertsContainer />
        <LayoutContainer />
        <FooterContainer />
      </div>
    );
  }

  return (
    <Adapter Link={Link} history={history}>
      {body}
    </Adapter>
  );
};

export const App = () => {
  useSetMobileDevice();
  useFetchPublicFeatures(); // load public features

  const lang = useSelector(selectCurrentLanguage);

  return (
    <IntlProvider locale={lang} messages={languageMap[lang]} key={lang}>
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
