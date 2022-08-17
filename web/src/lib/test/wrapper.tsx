import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
/* eslint-disable-next-line */
import { Router } from 'react-router';
import { createStore } from 'redux';
import { createBrowserHistory } from 'history';

import { rootReducer } from 'src/modules';
import { languageMap } from 'src/translations';
import { AppContextProvider } from 'web/src/components/app/AppContextProvider';

const browserHistory = createBrowserHistory();
const store = createStore(rootReducer);

const lang = 'en';

export const TestComponentWrapper: React.FC = ({ children }) => {
  return (
    <Router history={browserHistory}>
      <IntlProvider {...{ locale: lang }} defaultLocale={lang} messages={languageMap[lang]}>
        <Provider store={store}>
          <AppContextProvider>{children}</AppContextProvider>
        </Provider>
      </IntlProvider>
    </Router>
  );
};
