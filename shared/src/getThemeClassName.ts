import { themeDark, themeLight } from 'shared/src/theme/vars.css';
import { Theme } from 'shared/src/types';

export const getThemeClassName = (theme: Theme): string =>
  theme === 'light' ? themeLight : themeDark;
