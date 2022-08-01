import { createContext, PropsWithChildren, ReactNode, useContext, useMemo } from 'react';
import type { Link as LinkReactRouter } from 'react-router-dom';
import type { History, LocationState } from 'history';
import { useLanguage } from 'web/src/components/app/AppContext';
import { createT, SharedTranslateFn } from './sharedI18n';

interface AdapterContextValue<TParams = {}, TLocationState = LocationState> {
  t: SharedTranslateFn;
  Link: typeof LinkReactRouter;
  history: History<TLocationState>;
  params: TParams;
}

const AdapterContext = createContext(null as any as AdapterContextValue<any, any>);

export const useAdapterContext = <TParams, TLocationState = LocationState>() =>
  useContext<AdapterContextValue<TParams, TLocationState>>(AdapterContext);

export const useSharedT = () => useAdapterContext().t;

export const useSharedLink = () => useAdapterContext().Link;

export const useSharedHistory = () => useAdapterContext().history;

export const useSharedParams = <TParams, TLocationState>() =>
  useAdapterContext<TParams, TLocationState>().params;

interface Props<TParams, TLocationState = LocationState> {
  children: ReactNode;
  Link: typeof LinkReactRouter;
  history: History<TLocationState>;
  params?: TParams;
}

export const Adapter = <TParams, TLocationState>({
  children,
  Link,
  history,
  params,
}: PropsWithChildren<Props<TParams, TLocationState>>) => {
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
