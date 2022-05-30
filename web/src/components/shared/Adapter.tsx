import { createContext, PropsWithChildren, ReactNode, useContext, useMemo } from 'react';
import type { Link as LinkReactRouter } from 'react-router-dom';
import type { History, LocationState } from 'history';
import { useLanguage } from '../app/AppContext';
import { createT, SharedTranslateFn } from './sharedI18n';

interface AdapterCntextValue<TParams = {}> {
  t: SharedTranslateFn;
  Link: typeof LinkReactRouter;
  history: History<LocationState>;
  params: TParams;
}

const AdapterContext = createContext(null as any as AdapterCntextValue<any>);

export const useAdapterContext = <TParams,>() =>
  useContext<AdapterCntextValue<TParams>>(AdapterContext);

export const useSharedT = () => useAdapterContext().t;

export const useSharedLink = () => useAdapterContext().Link;

export const useSharedHistory = () => useAdapterContext().history;

export const useSharedParams = <TParams,>() => useAdapterContext<TParams>().params;

interface Props<TParams> {
  children: ReactNode;
  Link: typeof LinkReactRouter;
  history: History<LocationState>;
  params?: TParams;
}

export const Adapter = <TParams,>({
  children,
  Link,
  history,
  params,
}: PropsWithChildren<Props<TParams>>) => {
  const language = useLanguage();
  const value = useMemo(
    () => ({
      t: createT(language),
      Link,
      history,
      params: params ?? {},
    }),
    [language, Link, history, params],
  );

  return <AdapterContext.Provider value={value}>{children}</AdapterContext.Provider>;
};
