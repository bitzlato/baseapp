import { globalStyle } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { fontSizeVars, radiiVars, sizeVars, vars } from 'web/src/theme/vars.css';

export const input = sprinkles({
  width: 'full',
});

globalStyle(`${input}.react-date-picker, ${input}.react-date-picker *`, {
  boxSizing: 'border-box',
});

// input
globalStyle(`${input} .react-date-picker__inputGroup`, {
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
  height: 'auto',
  minHeight: sizeVars['12x'],
  paddingTop: sizeVars['4x'],
  paddingLeft: sizeVars['4x'],
  paddingRight: sizeVars['4x'],
  paddingBottom: '2px',
  borderStyle: 'solid',
  borderColor: vars.colors.inputBorder,
  borderWidth: 1,
  borderRadius: sizeVars['1.5x'],
  fontFamily: "'Montserrat', helvetica, sans-serif",
  fontSize: fontSizeVars.medium,
  color: vars.colors.text,
  backgroundColor: 'transparent',
});

globalStyle(`${input} .react-date-picker__inputGroup__input`, {
  minWidth: '0.6em',
  position: 'relative',
  padding: '2px',
  lineHeight: '20px',
  border: 'none',
  borderWidth: 0,
  fontFamily: "'Montserrat', helvetica, sans-serif",
  fontSize: fontSizeVars.medium,
  color: vars.colors.text,
  background: 'transparent',
  boxSizing: 'content-box',
  MozAppearance: 'textfield',
  // outline: 'none',
});

globalStyle(`${input} .react-date-picker__inputGroup__input--hasLeadingZero`, {
  marginLeft: '-0.6em',
  paddingLeft: 'calc(2px + 0.6em)',
});

globalStyle(`${input} .react-date-picker__inputGroup__leadingZero`, {
  padding: '2px 0',
  marginRight: '-2px',
});

globalStyle(`${input} .react-date-picker__inputGroup__divider`, {
  padding: '2px 0',
});

globalStyle(
  `${input} input::-webkit-outer-spin-button, ${input} input::-webkit-inner-spin-button`,
  {
    WebkitAppearance: 'none',
    margin: 0,
  },
);

globalStyle(`${input} .react-date-picker__calendar-button`, {
  position: 'absolute',
  right: 0,
  top: '50%',
  height: '100%',
  paddingLeft: sizeVars['5x'],
  paddingRight: sizeVars['5x'],
  transform: 'translateY(-50%)',
  border: 'none',
  background: 'none',
  color: vars.colors.calendarItemActiveBg,
});

globalStyle(`${input}.react-date-picker--closed .react-date-picker__calendar-button`, {
  color: vars.colors.text,
});

// calendar
globalStyle(`${input} .react-date-picker__calendar`, {
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  width: '100%',
  zIndex: 10000,

  opacity: 1,
  pointerEvents: 'initial',
  transform: 'translateY(0)',

  borderRadius: radiiVars['2x'],
  backgroundColor: vars.colors.selectDropdownBg,
  boxShadow: vars.boxShadows.dropdown,
});

globalStyle(`${input} .react-date-picker__calendar.react-date-picker__calendar--closed`, {
  opacity: 0,
  pointerEvents: 'none',
  transform: 'translateY(-5%)',
});

globalStyle('.react-calendar', {
  paddingTop: sizeVars['3x'],
  paddingBottom: sizeVars['5x'],
  paddingLeft: sizeVars['5x'],
  paddingRight: sizeVars['5x'],
  fontFamily: "'Montserrat', helvetica, sans-serif",
});

globalStyle('.react-calendar__navigation', {
  display: 'flex',
});

globalStyle('.react-calendar__navigation__label__labelText', {
  fontSize: fontSizeVars.small,
});

globalStyle('.react-calendar__navigation__arrow, .react-calendar__navigation__label', {
  paddingTop: sizeVars['2x'],
  paddingBottom: sizeVars['2x'],
  paddingLeft: sizeVars['3x'],
  paddingRight: sizeVars['3x'],
  background: 0,
  border: 0,
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  cursor: 'pointer',
  color: vars.colors.text,
  fontWeight: 500,
});

globalStyle('.react-calendar__month-view__weekdays', {
  paddingTop: sizeVars['2x'],
  borderBottomColor: vars.colors.inputBorder,
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
});

globalStyle('.react-calendar__month-view__weekdays__weekday', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 34,
  height: 31,
  fontSize: fontSizeVars.caption,
  textAlign: 'center',
  color: vars.colors.text,
});

globalStyle('.react-calendar__month-view__weekdays__weekday abbr', {
  textDecoration: 'none',
});

globalStyle('.react-calendar__month-view__days', {
  paddingTop: sizeVars['2x'],
});

globalStyle('.react-calendar__tile', {
  height: 31,
  padding: 0,
  background: 0,
  border: 0,
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  cursor: 'pointer',
  color: vars.colors.text,
  fontSize: fontSizeVars.caption,
});

globalStyle(
  '.react-calendar__tile abbr, .react-calendar__decade-view__years__year, .react-calendar__century-view__decades__decade',
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 31,
    borderRadius: '4px',
  },
);

globalStyle(
  '.react-calendar__tile:not([disabled]):hover abbr, .react-calendar__tile.react-calendar__decade-view__years__year:hover, .react-calendar__tile.react-calendar__century-view__decades__decade:hover',
  {
    backgroundColor: vars.colors.calendarItemHoverBg,
    color: vars.colors.text,
  },
);

globalStyle('.react-calendar__tile[disabled]', {
  opacity: 0.2,
  cursor: 'not-allowed',
});

globalStyle('.react-calendar__tile--active.react-calendar__month-view__days__day abbr', {
  padding: 0,
  backgroundColor: vars.colors.calendarItemActiveBg,
  color: vars.colors.calendarItemActiveText,
});

globalStyle('.react-calendar__tile.react-calendar__month-view__days__day--neighboringMonth', {
  color: vars.colors.textMuted,
});

globalStyle('.react-calendar__tile.react-calendar__month-view__days__day abbr', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  margin: '0 auto',
  borderRadius: '50%',
});

globalStyle('.react-calendar__tile--now.react-calendar__month-view__days__day abbr', {
  borderWidth: 1,
  borderColor: vars.colors.calendarItemActiveBg,
  borderStyle: 'solid',
  borderRadius: '50%',
});

globalStyle(
  '.react-calendar__tile--hasActive abbr, .react-calendar__decade-view__years__year.react-calendar__tile--hasActive, .react-calendar__century-view__decades__decade.react-calendar__tile--hasActive',
  {
    backgroundColor: vars.colors.calendarItemActiveBg,
    color: vars.colors.calendarItemActiveText,
    borderRadius: '4px',
  },
);

globalStyle(
  '.react-calendar__tile--now.react-calendar__year-view__months__month, .react-calendar__decade-view__years__year.react-calendar__tile--now, .react-calendar__century-view__decades__decade.react-calendar__tile--now',
  {
    borderWidth: 1,
    borderColor: vars.colors.calendarItemActiveBg,
    borderStyle: 'solid',
    borderRadius: '4px',
  },
);
