import { ComponentProps } from 'react';
import { getThemeFromStorage, setThemeInStorage } from 'web/src/helpers/storageTheme';
import { detectLanguage, setLanguage } from 'web/src/modules/public/i18n/reducer';
import { Theme } from 'web/src/types';
import { StandaloneAppContextProvider } from './StandaloneAppContextProvider';
import { StandaloneFooter } from './StandaloneFooter';
import { StandaloneHeader } from './StandaloneHeader';

export const standaloneComponents = {
  header: (props: ComponentProps<typeof StandaloneHeader>) => (
    <StandaloneAppContextProvider {...props}>
      <StandaloneHeader {...props} />
    </StandaloneAppContextProvider>
  ),
  footer: StandaloneFooter,
};

export const utils = {
  getTheme: (): Theme => getThemeFromStorage() ?? 'dark',
  getLanguage: detectLanguage,
  setTheme: setThemeInStorage,
  setLanguage,
};
