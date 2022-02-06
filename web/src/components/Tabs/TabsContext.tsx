import { createContext } from 'react';

interface TabsContextValue {
  currentTab?: string | undefined;
  setCurrentTab: (value: string) => void;
}

export const TabsContext = createContext<TabsContextValue>(null as any as TabsContextValue);
