import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { queries } from 'web/src/theme/themeUtils';
import { vars, sizeVars, radiiVars, zIndexVars, fontSizeVars } from './vars.css';

const lineHeights = {
  // used in Button
  small: '16px' as const,
  medium: '20px' as const,
  // used in text
  base: '1.3' as const,
  oneHalf: '1.5' as const,
};

const minWidth = {
  '9x': sizeVars['9x'],
  '11x': sizeVars['11x'],
  '14x': sizeVars['14x'],
  '18x': sizeVars['18x'],
};

const minHeights = {
  '9x': sizeVars['9x'],
  '11x': sizeVars['11x'],
  '12x': sizeVars['12x'],
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
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'block', /* 'inline', */ 'inline-flex', 'inline-block'],
    flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
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
    fontSize: fontSizeVars,

    borderWidth: borderWidths,
    borderTopWidth: borderWidths,
    borderRightWidth: borderWidths,
    borderBottomWidth: borderWidths,
    borderLeftWidth: borderWidths,
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
    alignSelf: ['center', 'stretch'],
    flexWrap: ['wrap', 'nowrap'],
    flexShrink: [0, 1, 2],

    flexGrow: [0, 0.5, 1, 2],
    flex: [0, 1, 1.618],

    // border
    border: ['none'],
    borderStyle: ['solid'],
    borderTopStyle: ['solid'],
    borderRightStyle: ['solid'],
    borderBottomStyle: ['solid'],
    borderLeftStyle: ['solid'],
    borderRadius: radiiVars,

    // layout
    position: ['absolute', 'relative', 'fixed'],
    top: [0],
    right: [0],
    bottom: [0],
    left: [0],
    overflowY: ['auto'],
    overflow: ['hidden'],
    zIndex: zIndexVars,

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
    fontStyle: ['normal', 'italic'],
    lineHeight: lineHeights,
    minHeight: minHeights,
    minWidth,
    textAlign: ['left', 'center', 'right'],
    textTransform: ['uppercase', 'capitalize'],
    wordBreak: ['break-word'],
    whiteSpace: ['nowrap', 'pre-line'],
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
