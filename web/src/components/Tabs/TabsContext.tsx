import { createContext } from 'react';

interface TabsContextValue {
    currentTab: string;
    setCurrentTab: (value: string) => void;
}

export const TabsContext = createContext<TabsContextValue>(null as TabsContextValue);
