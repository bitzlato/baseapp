import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';

export const container = style({});

export const hContainer = style([
  container,
  {
    display: 'flex',
  },
]);

export const step = style([
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    margin: '10px 0',
  },
]);

export const hStep = style([
  step,
  {
    margin: '0 28px',

    ':last-child': {
      marginRight: 0,
    },
    ':first-child': {
      marginLeft: 0,
    },
  },
]);

export const vStepper = style({
  position: 'relative',
  flexGrow: 1,
  display: 'flex',
});

const circle = style([
  step,
  {
    margin: 'auto',
    borderRadius: '100%',
    width: '8px',
    height: '8px',
    display: 'inline-block',
  },
]);

export const vCircle = style([
  step,
  {
    margin: 'auto',
    borderRadius: '100%',
    width: '8px',
    height: '8px',
    display: 'inline-block',
  },
  sprinkles({
    borderWidth: '2x',
    borderStyle: 'solid',
    borderColor: 'tradeHistoryCircleFilled',
  }),
]);

export const hCircle = style([
  circle,
  {
    width: '28px',
    height: '28px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
]);

export const line = style([
  step,
  {
    left: '2px',
    top: '50%',
    height: '66%',
    marginTop: '15px',
    position: 'absolute',
    borderRadius: '6px',
    width: '1px',
  },
  {
    selectors: {
      [`${step}:last-child &`]: {
        borderLeft: '3px solid white',
        zIndex: '-1',
      },
    },
  },
]);

export const hLine = style([
  line,
  {
    left: '116%',
    top: '40%',
    margin: 0,
    width: '48px',
    height: '4px',
  },
]);

export const circleCompleted = style([
  step,
  vCircle,
  {
    visibility: 'visible',
  },
  sprinkles({
    backgroundColor: 'tradeHistoryCircleFilled',
  }),
]);

export const hCircleCompleted = style([
  hStep,
  hCircle,
  {
    visibility: 'visible',
  },
  sprinkles({
    backgroundColor: 'tradeMainComponentCircleFilled',
  }),
]);

export const lineCompleted = style([
  step,
  line,
  sprinkles({
    borderWidth: '2x',
    borderStyle: 'solid',
    borderColor: 'tradeHistoryCircleFilled',
  }),
]);

export const hLineCompleted = style([
  hStep,
  hLine,
  sprinkles({
    borderWidth: '2x',
    borderStyle: 'solid',
    borderColor: 'tradeMainComponentCircleFilled',
    backgroundColor: 'tradeMainComponentCircleFilled',
  }),
]);

export const circleActive = style([
  step,
  vCircle,
  {
    visibility: 'visible',
  },
]);

export const circleEmpty = style([
  step,
  vCircle,
  {
    visibility: 'hidden',
  },
]);

export const hCircleEmpty = style([
  step,
  hCircle,
  {
    visibility: 'visible',
  },
  sprinkles({
    backgroundColor: 'tradeHistoryCircleEmpty',
  }),
]);

export const hLineEmpty = style([
  step,
  hLine,
  sprinkles({
    borderWidth: '2x',
    borderStyle: 'solid',
    borderColor: 'tradeHistoryCircleEmpty',
    backgroundColor: 'tradeHistoryCircleEmpty',
  }),
]);

export const content = style({
  marginLeft: '20px',
  display: 'inline-block',
  flexGrow: 1,
});
