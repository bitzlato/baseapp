import { createContext, FC, useContext, useMemo } from 'react';
import type { Link as LinkReactRouter } from 'react-router-dom';
import { useLanguage } from '../app/AppContext';
import { createT, SharedTranslateFn } from './sharedI18n';

interface AdapterCntextValue {
  t: SharedTranslateFn;
  Link: typeof LinkReactRouter;
}

const AdapterContext = createContext(null as any as AdapterCntextValue);

export const useAdapterContext = () => useContext(AdapterContext);

export const useSharedT = () => useAdapterContext().t;

export const useSharedLink = () => useAdapterContext().Link;

interface Props {
  Link: typeof LinkReactRouter;
}

export const Adapter: FC<Props> = ({ children, Link }) => {
  const language = useLanguage();
  const value = useMemo(
    () => ({
      t: createT(language),
      Link,
    }),
    [language, Link],
  );

  return <AdapterContext.Provider value={value}>{children}</AdapterContext.Provider>;
};
