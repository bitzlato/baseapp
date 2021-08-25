import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactGA from 'react-ga';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { Router } from 'react-router';
import { gaTrackerKey } from './api';
import { ErrorWrapper } from './containers';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { useSetMobileDevice } from './hooks';
import * as mobileTranslations from './mobile/translations';
import { selectCurrentLanguage, selectMobileDeviceState } from './modules';
import { languageMap } from './translations';

const gaKey = gaTrackerKey();
const browserHistory = createBrowserHistory();

if (gaKey) {
    ReactGA.initialize(gaKey);
    browserHistory.listen((location) => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    });
}

const bugsnagKey = process.env.REACT_APP_BUGSNAG_KEY;

if (bugsnagKey) {
    Bugsnag.start({
        apiKey: bugsnagKey || 'DO_NOT_SEND',
        appVersion: process.env.REACT_APP_BUGSNAG_VERSION,
        releaseStage: process.env.REACT_APP_BUGSNAG_RELEASE_STAGE,
        plugins: [new BugsnagPluginReact()],
    });
}

const ErrorBoundary = bugsnagKey
    ? Bugsnag.getPlugin('react').createErrorBoundary(React)
    : ErrorWrapper;

/* Mobile components */
const MobileHeader = React.lazy(() => import('./mobile/components/Header').then(({ Header }) => ({ default: Header })));
const MobileFooter = React.lazy(() => import('./mobile/components/Footer').then(({ Footer }) => ({ default: Footer })));

/* Desktop components */
const AlertsContainer = React.lazy(() => import('./containers/Alerts').then(({ Alerts }) => ({ default: Alerts })));
const CustomizationContainer = React.lazy(() =>
    import('./containers/Customization').then(({ Customization }) => ({ default: Customization }))
);
const HeaderContainer = React.lazy(() => import('./containers/Header').then(({ Header }) => ({ default: Header })));
const SidebarContainer = React.lazy(() => import('./containers/Sidebar').then(({ Sidebar }) => ({ default: Sidebar })));
const LayoutContainer = React.lazy(() => import('./routes').then(({ Layout }) => ({ default: Layout })));

const getTranslations = (lang: string, isMobileDevice: boolean) => {
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

    if (browserHistory.location.pathname === '/setup' || !isMobileDevice) {
        return (
            <React.Fragment>
                <HeaderContainer />
                <SidebarContainer />
                <CustomizationContainer />
                <AlertsContainer />
                <LayoutContainer />
            </React.Fragment>
        );
    }

    return (
        <div className="pg-mobile-app">
            <MobileHeader />
            <AlertsContainer/>
            <LayoutContainer/>
            <MobileFooter />
        </div>
    );
};

const defaultRichTextElements = {
    'br': () => <br />,
}

export const App = () => {
    useSetMobileDevice();
    const lang = useSelector(selectCurrentLanguage);
    const isMobileDevice = useSelector(selectMobileDeviceState);

    return (
        <IntlProvider locale={lang} messages={getTranslations(lang, isMobileDevice)} key={lang} defaultRichTextElements={defaultRichTextElements}>
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
