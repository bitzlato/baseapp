import { LanguageCode } from 'web/src/charting_library/charting_library.min';
import { DEFAULT_TRADING_VIEW_INTERVAL } from '../../constants';
import { customWidgetOptions } from '../../custom/tradingChartConfig';

export const widgetParams = {
  interval: String(DEFAULT_TRADING_VIEW_INTERVAL),
  containerId: 'tv_chart_container',
};

export const widgetOptions = (colorTheme?: string) => {
  return {
    allow_symbol_change: false,
    autosize: true,
    calendar: true,
    client_id: 'tradingview.com',
    custom_css_url: `${process.env.ASSET_PATH}css/tradingview.css`,
    debug: false,
    details: true,
    disabled_features: ['use_localstorage_for_settings', 'header_symbol_search'],
    enable_publishing: false,
    enabled_features: ['show_animated_logo'],
    fullscreen: false,
    height: 610,
    hide_side_toolbar: false,
    hotlist: true,
    library_path: `${process.env.ASSET_PATH}charting_library/`,
    popup_height: '50',
    popup_width: '000',
    show_popup_button: true,
    studies_overrides: {},
    timeframe: '1D',
    user_id: 'public_user_id',
    withdateranges: false,

    ...customWidgetOptions(colorTheme),
  };
};

export const isLangIncluded = (value: string): value is LanguageCode =>
  [
    'ar',
    'zh',
    'cs',
    'da_DK',
    'nl_NL',
    'en',
    'et_EE',
    'fr',
    'de',
    'el',
    'he_IL',
    'hu_HU',
    'id_ID',
    'it',
    'ja',
    'ko',
    'fa',
    'pl',
    'pt',
    'ro',
    'ru',
    'sk_SK',
    'es',
    'sv',
    'th',
    'tr',
    'vi',
  ].includes(value);

export const getDisabledFeatures = (isMobileDevice: boolean) =>
  isMobileDevice
    ? [
        'border_around_the_chart',
        'chart_property_page_background',
        'chart_property_page_scales',
        'chart_property_page_style',
        'chart_property_page_timezone_sessions',
        'chart_property_page_trading',
        'compare_symbol',
        'control_bar',
        'countdown',
        'create_volume_indicator_by_default',
        'display_market_status',
        'edit_buttons_in_legend',
        'go_to_date',
        'header_chart_type',
        'header_compare',
        'header_indicators',
        'header_saveload',
        'header_screenshot',
        'header_symbol_search',
        'header_undo_redo',
        'header_widget_dom_node',
        'hide_last_na_study_output',
        'hide_left_toolbar_by_default',
        'left_toolbar',
        'legend_context_menu',
        'main_series_scale_menu',
        'pane_context_menu',
        'show_chart_property_page',
        'study_dialog_search_control',
        'symbol_info',
        'timeframes_toolbar',
        'timezone_menu',
        'volume_force_overlay',
      ]
    : ['header_symbol_search', 'use_localstorage_for_settings'];
