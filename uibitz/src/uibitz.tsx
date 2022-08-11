import { render, unmountComponentAtNode } from 'react-dom';
import { RenderComponentFn, UIBitzConfig } from 'uibitz/src/types';
import { standaloneComponents, utils } from 'shared/standaloneComponents';
import { Theme, Language } from 'web/src/types';

global.uibitz = ((defaultConfig: UIBitzConfig) => {
  const config = defaultConfig;
  const setConfig = (newConfig: Partial<UIBitzConfig>) => {
    Object.assign(config, newConfig);
  };

  let fns: Array<() => void> = [];
  const rerender = () => {
    fns.forEach((fn) => fn());
  };

  const handleThemeChange = (theme: Theme) => {
    config.onThemeChange(theme);

    rerender();
  };
  const handleLanguageChange = (language: Language) => {
    config.onLanguageChange(language);

    rerender();
  };

  const renderComponent: RenderComponentFn = (componentName, element, props) => {
    if (!standaloneComponents[componentName]) {
      throw new Error(`Component ${componentName} not found`);
    }

    const mount = () => {
      const theme = config.getTheme();
      const language = config.getLanguage();
      const Component = standaloneComponents[componentName];

      render(
        <Component
          {...props}
          mainUrl={config.mainUrl}
          theme={theme}
          language={language}
          onThemeChange={handleThemeChange}
          onLanguageChange={handleLanguageChange}
        />,
        element,
      );
    };
    mount();
    fns.push(mount);

    return {
      destroy: () => {
        fns = fns.filter((fn) => fn !== mount);

        return unmountComponentAtNode(element);
      },
    };
  };

  return {
    VERSION,
    config,
    setConfig,
    renderComponent,
  };
})({
  mainUrl: global.UIBITZ_MAIN_URL,
  getTheme: utils.getTheme,
  getLanguage: utils.getLanguage,
  onThemeChange: utils.setTheme,
  onLanguageChange: utils.setLanguage,
});
