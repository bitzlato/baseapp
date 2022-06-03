import { createContext, useContext } from 'react';
import { User } from 'web/src/modules/user/profile/types';
import { Language, Theme } from 'web/src/types';

interface AppContextValue {
  theme: Theme;
  lang: Language;
  user?: User | undefined;
  isMobileDevice: boolean;
  handleFetchError: (error: unknown) => void;
}

export const AppContext = createContext(null as any as AppContextValue);

export const useAppContext = () => useContext(AppContext);

export const useTheme = () => useAppContext().theme;

export const useLanguage = () => useAppContext().lang;

export const useUser = () => useAppContext().user;

export const useIsMobileDevice = () => useAppContext().isMobileDevice;

export const useHandleFetchError = () => useAppContext().handleFetchError;
