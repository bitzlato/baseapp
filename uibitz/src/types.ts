import { Theme, Language } from 'web/src/types';

export interface UIBitzComponent {
  destroy: () => void;
}

export interface UIBitzConfig {
  mainUrl: string;
  getTheme: () => Theme;
  getLanguage: () => Language;
  onThemeChange: (theme: Theme) => void;
  onLanguageChange: (language: Language) => void;
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
