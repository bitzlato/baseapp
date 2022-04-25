import { createContext, FC, useContext, useMemo } from 'react';
import { useLanguage } from '../app/AppContext';
import { createT, SharedTranslateFn } from './sharedI18n';

interface AdapterCntextValue {
  t: SharedTranslateFn;
}

const AdapterContext = createContext(null as any as AdapterCntextValue);

export const useAdapterContext = () => useContext(AdapterContext);

export const useSharedT = () => useAdapterContext().t;

interface Props {}

export const Adapter: FC<Props> = ({ children }) => {
  const language = useLanguage();
  const value = useMemo(
    () => ({
      t: createT(language),
    }),
    [language],
  );

  return <AdapterContext.Provider value={value}>{children}</AdapterContext.Provider>;
};
