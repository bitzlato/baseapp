import { createContext, FC, useContext, useMemo } from 'react';
import type { Link as LinkReactRouter } from 'react-router-dom';
import type { History, LocationState } from 'history';
import { useLanguage } from '../app/AppContext';
import { createT, SharedTranslateFn } from './sharedI18n';

interface AdapterCntextValue {
  t: SharedTranslateFn;
  Link: typeof LinkReactRouter;
  history: History<LocationState>;
}

const AdapterContext = createContext(null as any as AdapterCntextValue);

export const useAdapterContext = () => useContext(AdapterContext);

export const useSharedT = () => useAdapterContext().t;

export const useSharedLink = () => useAdapterContext().Link;

export const useSharedHistory = () => useAdapterContext().history;

interface Props {
  Link: typeof LinkReactRouter;
  history: History<LocationState>;
}

export const Adapter: FC<Props> = ({ children, Link, history }) => {
  const language = useLanguage();
  const value = useMemo(
    () => ({
      t: createT(language),
      Link,
      history,
    }),
    [language, Link, history],
  );

  return <AdapterContext.Provider value={value}>{children}</AdapterContext.Provider>;
};
