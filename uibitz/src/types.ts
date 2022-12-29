import { Theme, Language } from 'web/src/types';
import { User } from 'web/src/modules/user/profile/types';

export interface UIBitzComponent {
  destroy: () => void;
}

export interface UIBitzConfig {
  mainUrl: string;
  languages?: Language[] | undefined;
  getTheme: () => Theme;
  getLanguage: () => Language;
  onThemeChange: (theme: Theme) => void;
  onLanguageChange: (language: Language) => void;
  onLoggedIn?: ((user: User | undefined) => void) | undefined;
}

export type RenderComponentFn = (
  componentName: 'header' | 'footer',
  element: HTMLDivElement,
  props?: Record<string, any> | undefined,
) => UIBitzComponent;

export interface UIBitz {
  readonly VERSION: string;
  readonly config: UIBitzConfig;

  setConfig(config: Partial<UIBitzConfig>): void;
  renderComponent: RenderComponentFn;
}
