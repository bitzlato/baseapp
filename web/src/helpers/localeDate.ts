import moment from 'moment-timezone';
import 'moment/locale/ru';
import { Language } from '../types';
import { getTimezone } from './timezone';

const FORMATS = {
  fullDate: 'DD-MM-YYYY HH:mm:ss',
  shortDate: 'DD-MM-YYYY HH:mm',
  veryShortDate: 'D MMMM',
  literalFullDate: 'D MMMM YYYY HH:mm',
  time: 'HH:mm:ss',
  date: 'DD-MM-YYYY',
  dateInput: 'YYYY-MM-DD',
};

type FormatType = keyof typeof FORMATS;

export const localeDate = (
  date: moment.MomentInput,
  format: FormatType,
  locale: Language = 'en',
  timezone = getTimezone(),
) => {
  const formatDisplay = FORMATS[format];
  const momentObj = moment(date);
  return momentObj.tz(timezone).locale(locale).format(formatDisplay);
};
