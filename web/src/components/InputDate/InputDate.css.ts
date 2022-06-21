import { globalStyle, style } from '@vanilla-extract/css';
import { fontSizeVars, sizeVars, vars } from 'web/src/theme/vars.css';

export const input = style({});

globalStyle(`${input}::-webkit-calendar-picker-indicator`, {
  display: 'none',
});

globalStyle('.react-calendar', {
  paddingTop: sizeVars['3x'],
  paddingBottom: sizeVars['5x'],
  paddingLeft: sizeVars['5x'],
  paddingRight: sizeVars['5x'],
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
  '.react-calendar__tile:hover abbr, .react-calendar__tile.react-calendar__decade-view__years__year:hover, .react-calendar__tile.react-calendar__century-view__decades__decade:hover',
  {
    backgroundColor: vars.colors.calendarItemHoverBg,
    color: vars.colors.text,
  },
);

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
