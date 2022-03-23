import { Theme } from 'web/src/types';

const THEME_STORAGE_KEY = 'bitzlato_p2p_ui_theme';
const OLD_THEME_STORAGE_KEY = 'colorTheme';

export const setThemeInStorage = (theme: Theme) => {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const getThemeFromStorage = (): Theme | null => {
  const theme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (theme === null) {
    return window.localStorage.getItem(OLD_THEME_STORAGE_KEY) as Theme | null;
  }

  return theme as Theme | null;
};
