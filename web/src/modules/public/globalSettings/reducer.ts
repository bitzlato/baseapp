import {
  CHANGE_COLOR_THEME,
  TOGGLE_CHART_REBUILD,
  TOGGLE_MARKET_SELECTOR,
  TOGGLE_MOBILE_DEVICE,
  TOGGLE_SIDEBAR,
  TRIGGER_APPLY_WINDOW_ENVS,
} from './constants';

export type Theme = 'light' | 'dark';

export interface ColorThemeState {
  color: Theme;
  chartRebuild: boolean;
  marketSelectorActive: boolean;
  isMobileDevice: boolean;
  sideBarActive: boolean;
  applyWindowEnvsTrigger: boolean;
}

const currentColorTheme = (localStorage.getItem('colorTheme') as Theme) || 'dark';

export const initialChangeColorThemeState: ColorThemeState = {
  color: currentColorTheme,
  chartRebuild: false,
  marketSelectorActive: false,
  isMobileDevice: false,
  sideBarActive: false,
  applyWindowEnvsTrigger: false,
};

export const changeColorThemeReducer = (state = initialChangeColorThemeState, action: any) => {
  switch (action.type) {
    case CHANGE_COLOR_THEME:
      localStorage.setItem('colorTheme', action.payload);

      return {
        ...state,
        color: action.payload,
      };
    case TOGGLE_CHART_REBUILD:
      return {
        ...state,
        chartRebuild: !state.chartRebuild,
      };
    case TOGGLE_MARKET_SELECTOR:
      return {
        ...state,
        marketSelectorActive: !state.marketSelectorActive,
        sideBarActive: false,
      };
    case TOGGLE_MOBILE_DEVICE:
      return {
        ...state,
        isMobileDevice: action.payload,
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sideBarActive: action.payload ?? !state.sideBarActive,
        marketSelectorActive: false,
      };
    case TRIGGER_APPLY_WINDOW_ENVS:
      return {
        ...state,
        applyWindowEnvsTrigger: !state.applyWindowEnvsTrigger,
      };
    default:
      return state;
  }
};
