import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { queries } from 'web/src/theme/themeUtils';
import { vars, sizeVars, radiiVars } from './vars.css';

const fontSizes = {
  caption: 12 as const,
  small: 14 as const,
  medium: 16 as const,
  large: 18 as const,
  lead: 20 as const,
};

const lineHeights = {
  // uses in Button
  small: '16px' as const,
  medium: '20px' as const,
};

const borderWidths = {
  '0': 0 as const,
  '1x': 1 as const,
  '2x': 2 as const,
};

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': queries.tablet },
    desktop: { '@media': queries.desktop },
    desktopXL: { '@media': queries.desktopXL },
    // desktopXXL: { '@media': queries.desktopXXL },
    desktopXXXL: { '@media': queries.desktopXXXL },
  },
  defaultCondition: 'mobile',
  responsiveArray: ['mobile', 'tablet', 'desktop', 'desktopXL', /* 'desktopXXL', */ 'desktopXXXL'],
  properties: {
    display: ['none', 'flex', 'block', /* 'inline', 'flex-inline', */ 'inline-block'],
    flexDirection: ['row', 'column'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    paddingTop: sizeVars,
    paddingBottom: sizeVars,
    paddingLeft: sizeVars,
    paddingRight: sizeVars,
    marginTop: sizeVars,
    marginBottom: sizeVars,
    marginLeft: sizeVars,
    marginRight: sizeVars,
    width: sizeVars,
    height: sizeVars,
    fontSize: fontSizes,
  },
  shorthands: {
    p: ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'],
    pt: ['paddingTop'],
    pb: ['paddingBottom'],
    pl: ['paddingLeft'],
    pr: ['paddingRight'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    m: ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
    mt: ['marginTop'],
    mb: ['marginBottom'],
    ml: ['marginLeft'],
    mr: ['marginRight'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    w: ['width'],
    h: ['height'],
    size: ['width', 'height'],
  },
});

const interactiveProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: '&:hover, &:focus-visible' },
  },
  defaultCondition: 'default',
  properties: {
    color: vars.colors,
    backgroundColor: vars.colors,
    textDecoration: ['none', 'underline'],
    borderColor: vars.colors,
    // borderTopColor: vars.colors,
    // borderRightColor: vars.colors,
    borderBottomColor: vars.colors,
    // borderLeftColor: vars.colors,
  },
  shorthands: {
    bg: ['backgroundColor'],
  },
});

const unresponsiveProperties = defineProperties({
  properties: {
    // flex
    alignSelf: ['center'],
    flexWrap: ['wrap', 'nowrap'],
    flexShrink: [0, 1, 2],
    flexGrow: [0, 1, 2],

    // border
    border: ['none'],
    borderWidth: borderWidths,
    borderStyle: ['solid'],
    borderTopWidth: borderWidths,
    borderTopStyle: ['solid'],
    borderRightWidth: borderWidths,
    borderRightStyle: ['solid'],
    borderBottomWidth: borderWidths,
    borderBottomStyle: ['solid'],
    borderLeftWidth: borderWidths,
    borderLeftStyle: ['solid'],
    borderRadius: radiiVars,

    // layout
    position: ['absolute', 'relative'],
    top: [0],
    right: [0],
    bottom: [0],
    left: [0],
    overflowY: ['auto'],
    overflow: ['hidden'],

    // other
    cursor: ['default', 'pointer', 'not-allowed'],
    boxShadow: {
      dropdown: vars.boxShadows.dropdown,
      modal: vars.boxShadows.modal,
    },
  },
});

const typographyProperties = defineProperties({
  properties: {
    fontFamily: {
      brand: "'Montserrat', helvetica, sans-serif",
    },
    fontWeight: {
      regular: 400,
      strong: 600,
    },
    lineHeight: lineHeights,
    textAlign: ['left', 'center'],
    textTransform: ['uppercase'],
    wordBreak: ['break-word'],
    whiteSpace: ['nowrap'],
    textOverflow: {
      ellipsis: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  interactiveProperties,
  unresponsiveProperties,
  typographyProperties,
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
