import { createContext, useContext } from 'react';
import { Theme } from 'web/src/types';

interface AppContextValue {
  theme: Theme;
}

export const AppContext = createContext(null as any as AppContextValue);

export const useAppContext = () => useContext(AppContext);

export const useTheme = () => useAppContext().theme;
