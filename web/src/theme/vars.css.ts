import { createGlobalTheme, createTheme } from '@vanilla-extract/css';
import * as colors from './colors';

export const fontSizeVars = createGlobalTheme(':root', {
  caption: '12px' as const,
  small: '14px' as const,
  medium: '15px' as const,
  large: '18px' as const,
  lead: '20px' as const,
  lead24: '24px' as const,
  lead30: '30px' as const,
});

export const zIndexVars = createGlobalTheme(':root', {
  drawer: '10000',
  modal: '10001',
  modalInner: '10002',
  tooltip: '10010',
});

export const sizeVars = createGlobalTheme(':root', {
  auto: 'auto' as const,
  full: '100%' as const,
  '0': '0px' as const,
  // '0.5x': '2px' as const,
  '1x': '4px' as const,
  '1.5x': '6px' as const,
  '2x': '8px' as const,
  '3x': '12px' as const,
  '4x': '16px' as const,
  '5x': '20px' as const,
  '6x': '24px' as const,
  '7x': '28px' as const,
  '8x': '32px' as const,
  '9x': '36px' as const,
  '10x': '40px' as const,
  '11x': '44px' as const,
  '12x': '48px' as const,
  '13x': '52px' as const,
  '14x': '56px' as const,
  '15x': '60px' as const,
  // '16x': '64px' as const,
  // '17x': '68px' as const,
  '18x': '72px' as const,
  // '19x': '76px' as const,
  '20x': '80px' as const,
});

export const radiiVars = createGlobalTheme(':root', {
  '0': '0px' as const,
  '1x': '4px' as const,
  '1.5x': '6px' as const,
  '2x': '8px' as const,
  circle: '9999px' as const,
});

export const transitionDurationVars = createGlobalTheme(':root', {
  base: '0.3s',
});

export const [themeLight, vars] = createTheme({
  boxShadows: {
    dropdown: `8px 8px 10px ${colors.black10}`,
    modal: `8px 4px 14px ${colors.black10}`,
    control: `0px 0px 0px 3px ${colors.mystic90}`,
    btnPrimaryFocus: `0px 0px 0px 3px ${colors.mystic90}`,
    btnSecondaryFocus: `0px 0px 0px 3px ${colors.shark19}`,
  },
  colors: {
    transparent: colors.transparent,

    beta: colors.goldTips,
    primary: colors.hawkesBlue,
    danger: colors.burntSienna,
    warning: colors.bamboo,
    success: colors.oceanGreen,
    secondary: colors.grayBlue,
    text: colors.mineShaft,
    textHighlighted: colors.goldTips,
    textMuted: colors.mineShaft50,
    interactive: colors.luckyPoint,
    interactiveHighlighted: colors.luckyPointLighter,
    alert: colors.flamingo,

    drawer: colors.white,
    drawerItem: colors.whiteLilac,
    drawerItemHover: colors.hawkesBlue,
    drawerItemDivider: colors.white,

    dropdown: colors.white,
    dropdownBorder: colors.selago,
    dropdownItem: colors.transparent,
    dropdownItemHover: colors.hawkesBlue,
    dropdownItemBorderBottom: colors.whiteLilac,
    dropdownItemActiveBefore: colors.cornflowerBlue,
    dropdownItemText: colors.silverChalice,
    dropdownItemHoverText: colors.black,
    dropdownItemActiveText: colors.black,
    dropdownItemIcon: colors.cornflowerBlue,
    dropdownItemHoverIcon: colors.indigo,
    dropdownItemActiveIcon: colors.indigo,

    btnPrimaryBg: colors.goldTips,
    btnPrimaryBg10: colors.goldTips10,
    btnPrimaryBg20: colors.goldTips20,
    btnPrimaryBgHover: colors.lightningYellow,
    btnPrimaryBgActive: colors.galliano,
    btnPrimaryBgDisabled: colors.mystic,
    btnPrimaryText: colors.catskillWhite,
    btnPrimaryTextDisabled: colors.manatee,

    btnSecondaryBg: colors.indigo,
    btnSecondaryBg10: colors.indigo10,
    btnSecondaryBg20: colors.indigo20,
    btnSecondaryBgHover: colors.indigoLight,
    btnSecondaryBgActive: colors.governorBay,
    btnSecondaryBgDisabled: colors.mystic,
    btnSecondaryText: colors.catskillWhite,
    btnSecondaryTextDisabled: colors.manatee,

    btnDangerBg: colors.burntSienna,
    btnDangerBg10: colors.burntSienna10,
    btnDangerBg20: colors.burntSienna20,
    btnDangerBgHover: colors.salmon,
    btnDangerBgActive: colors.flamingo,
    btnDangerBgDisabled: colors.mystic,
    btnDangerText: colors.catskillWhite,
    btnDangerTextDisabled: colors.manatee,

    btnClarifiedBg: colors.hawkesBlue,
    btnClarifiedBgHover: colors.spindle,
    btnClarifiedBgActive: colors.indigo,
    btnClarifiedBgDisabled: colors.mystic,
    btnClarifiedText: colors.indigo,
    btnClarifiedTextActive: colors.white,
    btnClarifiedTextDisabled: colors.manatee,

    themeSwitcherBorder: colors.selago,
    themeSwitcherBorderHover: colors.luckyPoint,
    themeSwitcherSun: colors.white,
    themeSwitcherSunHover: colors.white,
    themeSwitcherMoon: colors.luckyPoint,
    spinner01: colors.black20,
    spinner02: colors.black,
    backdrop: colors.black30,

    footerBg: colors.luckyPoint,
    footerTitle: colors.spindle,
    footerBorder: colors.sapphire,
    footerColor: colors.spindle,
    footerLinkColor: colors.cornflowerBlue,
    footerLinkColorHover: colors.goldTips,
    footerSocialIcon: colors.indigo,
    footerSocialIconHover: colors.spindle,

    infoBg: colors.whiteLilac,
    statBg: colors.whiteLilac,
    statIcon: colors.indigo30,

    modal: colors.white,
    modalHeaderBorderBottom: colors.mako10,

    skeleton: colors.black10,
    skeletonHighlighted: colors.silver,

    switcherTrack: colors.mako10,
    switcherTrackShadow: colors.mako10,
    switcherTrackChecked: colors.goldTips25,
    switcherTrackShadowChecked: colors.goldTips10,
    switcherThumb: colors.mako80,
    switcherThumbChecked: colors.goldTips,

    radio: colors.mako,
    radioShadow: colors.mako10,
    radioChecked: colors.goldTips,
    radioShadowChecked: colors.goldTips10,

    tooltip: colors.milanoRed,
    tooltipText: colors.white,

    cardHeaderBorderBottom: colors.waikawaGray24,

    reportBgHover: colors.whiteLilac,

    adBg: colors.whiteLilac,
    adTableHeader: colors.ebonyClay50,
    adTrader: colors.indigo,
    adTrade: colors.indigo,

    onlineStatusWaiting: colors.sweetCorn,
    onlineStatusInactive: colors.botticelli,

    variantSwitcherBorder: colors.ebonyClay15,
    variantSwitcherItemBgActive: colors.goldTips,
    variantSwitcherItemTextActive: colors.ebonyClay,

    paginationItemBgHover: colors.white05,
    paginationItemBgActive: colors.white10,
    paginationItemTextDisabled: colors.white30,

    bids: colors.green,
    asks: colors.carnation,

    notificationUnread: colors.burntSienna,
    notificationRead: colors.ebonyClay70,
    notificationTime: colors.ebonyClay70,

    btnDrawer: colors.ebonyClay,
    btnDrawerHover: colors.ebonyClay15,
  },
});

export const themeDark = createTheme(vars, {
  boxShadows: {
    dropdown: `8px 8px 10px ${colors.black10}`,
    modal: `8px 4px 14px ${colors.black10}`,
    control: `0px 0px 0px 3px ${colors.mystic15}`,
    btnPrimaryFocus: `0px 0px 0px 3px ${colors.mystic15}`,
    btnSecondaryFocus: `0px 0px 0px 3px ${colors.mystic15}`,
  },
  colors: {
    transparent: colors.transparent,

    beta: colors.goldTips,
    primary: colors.mako,
    danger: colors.burntSienna,
    warning: colors.bamboo,
    success: colors.oceanGreen,
    secondary: colors.silverChalice,
    text: colors.whiteLilac,
    textHighlighted: colors.goldTips,
    textMuted: colors.whiteLilac50,
    interactive: colors.silverChalice,
    interactiveHighlighted: colors.gray,
    alert: colors.flamingo,

    drawer: colors.ebonyClay,
    drawerItem: colors.white05,
    drawerItemHover: colors.mako,
    drawerItemDivider: colors.white10,

    dropdown: colors.ebonyClay,
    dropdownBorder: colors.transparent,
    dropdownItem: colors.transparent,
    dropdownItemHover: colors.mako,
    dropdownItemBorderBottom: colors.bunker,
    dropdownItemActiveBefore: colors.indigo,
    dropdownItemText: colors.silverChalice,
    dropdownItemHoverText: colors.white,
    dropdownItemActiveText: colors.spindle,
    dropdownItemIcon: colors.doveGray,
    dropdownItemHoverIcon: colors.white,
    dropdownItemActiveIcon: colors.spindle,

    btnPrimaryBg: colors.goldTips,
    btnPrimaryBg10: colors.goldTips10,
    btnPrimaryBg20: colors.goldTips20,
    btnPrimaryBgHover: colors.saffron,
    btnPrimaryBgActive: colors.goldenGrass,
    btnPrimaryBgDisabled: colors.mystic,
    btnPrimaryText: colors.catskillWhite,
    btnPrimaryTextDisabled: colors.manatee,

    btnSecondaryBg: colors.cornflowerBlueLighter,
    btnSecondaryBg10: colors.cornflowerBlueLighter10,
    btnSecondaryBg20: colors.cornflowerBlueLighter20,
    btnSecondaryBgHover: colors.anakiwa,
    btnSecondaryBgActive: colors.cornflowerBlueDarken,
    btnSecondaryBgDisabled: colors.mystic,
    btnSecondaryText: colors.catskillWhite,
    btnSecondaryTextDisabled: colors.manatee,

    btnDangerBg: colors.burntSienna,
    btnDangerBg10: colors.burntSienna10,
    btnDangerBg20: colors.burntSienna20,
    btnDangerBgHover: colors.salmon,
    btnDangerBgActive: colors.flamingo,
    btnDangerBgDisabled: colors.mystic,
    btnDangerText: colors.catskillWhite,
    btnDangerTextDisabled: colors.manatee,

    btnClarifiedBg: colors.white10,
    btnClarifiedBgHover: colors.white20,
    btnClarifiedBgActive: colors.indigo,
    btnClarifiedBgDisabled: colors.mystic,
    btnClarifiedText: colors.white,
    btnClarifiedTextActive: colors.white,
    btnClarifiedTextDisabled: colors.manatee,

    themeSwitcherBorder: colors.abbey,
    themeSwitcherBorderHover: colors.silverChalice,
    themeSwitcherSun: colors.silver,
    themeSwitcherSunHover: colors.mercury,
    themeSwitcherMoon: colors.abbey,
    spinner01: colors.white20,
    spinner02: colors.white,
    backdrop: colors.black30,

    footerBg: colors.ebonyClay,
    footerTitle: colors.silverChalice,
    footerBorder: colors.tuna,
    footerColor: colors.doveGray,
    footerLinkColor: colors.doveGray,
    footerLinkColorHover: colors.goldTips,
    footerSocialIcon: colors.doveGray,
    footerSocialIconHover: colors.silverChalice,

    infoBg: colors.mako,
    statBg: colors.mako,
    statIcon: colors.white30,

    modal: colors.charade,
    modalHeaderBorderBottom: colors.white10,

    skeleton: colors.black10,
    skeletonHighlighted: colors.white30,

    switcherTrack: colors.white10,
    switcherTrackShadow: colors.white10,
    switcherTrackChecked: colors.goldTips25,
    switcherTrackShadowChecked: colors.goldTips10,
    switcherThumb: colors.white80,
    switcherThumbChecked: colors.goldTips,

    radio: colors.white,
    radioShadow: colors.white10,
    radioChecked: colors.goldTips,
    radioShadowChecked: colors.goldTips10,

    tooltip: colors.milanoRed,
    tooltipText: colors.white,

    cardHeaderBorderBottom: colors.white24,

    reportBgHover: colors.white10,

    adBg: colors.white05,
    adTableHeader: colors.white50,
    adTrader: colors.malibu,
    adTrade: colors.indigo,

    onlineStatusWaiting: colors.sweetCorn,
    onlineStatusInactive: colors.botticelli,

    variantSwitcherBorder: colors.white10,
    variantSwitcherItemBgActive: colors.goldTips,
    variantSwitcherItemTextActive: colors.ebonyClay,

    paginationItemBgHover: colors.white05,
    paginationItemBgActive: colors.white10,
    paginationItemTextDisabled: colors.white30,

    bids: colors.milanoGreen,
    asks: colors.carnation,

    notificationUnread: colors.burntSienna,
    notificationRead: colors.white50,
    notificationTime: colors.white50,

    btnDrawer: colors.white,
    btnDrawerHover: colors.white50,
  },
});
