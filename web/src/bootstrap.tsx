/* eslint-disable global-require */
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FC, useMemo } from 'react';
import * as ReactDOM from 'react-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Provider, useSelector } from 'react-redux';

import { App } from './App';
import { AppContext } from './components/app/AppContext';
import './index.pcss';
import { rootSaga, selectCurrentColorTheme } from './modules';
import { rangerSagas } from './modules/public/ranger';
import { rangerMiddleware, sagaMiddleware, store } from './store';

if (!Intl?.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/en');
  require('@formatjs/intl-pluralrules/locale-data/ru');
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (!Intl?.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/locale-data/en');
  require('@formatjs/intl-relativetimeformat/locale-data/ru');
}

sagaMiddleware.run(rootSaga);
rangerMiddleware.run(rangerSagas);

const AppContextProvider: FC = ({ children }) => {
  const theme = useSelector(selectCurrentColorTheme);
  const value = useMemo(() => ({ theme }), [theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

ReactDOM.render(
  <Provider store={store}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
