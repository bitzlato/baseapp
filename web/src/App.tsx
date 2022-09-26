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
import { useSetMobileDevice } from './hooks';
import { selectCurrentColorTheme, selectCurrentLanguage, selectMobileDeviceState } from './modules';
import { languageMap } from './translations';
import { ErrorBoundary } from './containers/ErrorBoundary/ErrorBoundary';
import { lazyRetry } from './helpers/lazyRetry';
import { DeeplinkAlertProvider } from './containers/DeeplinkAlert/DeeplinkAlertContext';
import { DeeplinkAlertModal } from './containers/DeeplinkAlert/DeeplinkAlertModal';

const browserHistory = createBrowserHistory();

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
        <DeeplinkAlertModal />
        <AlertsContainer />
        <LayoutContainer />
        <FooterContainer />
      </div>
    );
  } else {
    body = (
      <div className={cn('pg-mobile-app', className)}>
        <Header />
        <DeeplinkAlertModal />
        <AlertsContainer />
        <LayoutContainer />
        <FooterContainer />
      </div>
    );
  }

  return (
    <DeeplinkAlertProvider>
      <Adapter Link={Link} history={history}>
        {body}
      </Adapter>
    </DeeplinkAlertProvider>
  );
};

export const App = () => {
  useSetMobileDevice();
  useFetchPublicFeatures(); // load public features
  useNewTradeNotifyWithSound(); // add sound notify on new trade

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
