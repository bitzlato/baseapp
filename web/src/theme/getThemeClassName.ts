import { themeDark, themeLight } from 'web/src/theme/vars.css';
import { Theme } from 'web/src/types';

export const getThemeClassName = (theme: Theme): string =>
  theme === 'light' ? themeLight : themeDark;
