import { createContext, useContext, useEffect } from 'react';
import { NotificationSubscribe, NotificationSubscriber } from 'web/src/lib/socket/types';
import { Language, Theme } from 'web/src/types';

interface AppContextValue {
  theme: Theme;
  lang: Language;
  isMobileDevice: boolean;
  notificationSubscribe: NotificationSubscribe;
  handleFetchError: (error: unknown) => void;
}

export const AppContext = createContext(null as any as AppContextValue);

export const useAppContext = () => useContext(AppContext);

export const useTheme = () => useAppContext().theme;

export const useLanguage = () => useAppContext().lang;

export const useIsMobileDevice = () => useAppContext().isMobileDevice;

export const useHandleFetchError = () => useAppContext().handleFetchError;

export const useNotificationSubscribe = (subscriber: NotificationSubscriber) => {
  const { notificationSubscribe } = useAppContext();

  useEffect(() => notificationSubscribe(subscriber), [notificationSubscribe, subscriber]);
};
