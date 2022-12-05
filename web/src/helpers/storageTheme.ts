import { StorageKeys } from 'web/src/helpers/storageKeys';
import { Theme } from 'web/src/types';

export const setThemeInStorage = (theme: Theme) => {
  window.localStorage.setItem(StorageKeys.theme, theme);
};

export const getThemeFromStorage = (): Theme | null => {
  const theme = window.localStorage.getItem(StorageKeys.theme);

  if (theme === null) {
    return window.localStorage.getItem(StorageKeys.oldTheme) as Theme | null;
  }

  return theme as Theme | null;
};
