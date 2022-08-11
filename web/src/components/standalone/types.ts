import { Language, Theme } from 'web/src/types';

export interface StandaloneComponentProps {
  mainUrl: string;
  theme: Theme;
  language: Language;
  onThemeChange?: ((theme: Theme) => void) | void;
  onLanguageChange?: ((language: Language) => void) | void;
}
