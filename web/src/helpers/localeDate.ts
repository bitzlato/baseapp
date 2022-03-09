import moment from 'moment-timezone';
import { getTimezone } from './timezone';

const FORMATS = {
  fullDate: 'DD-MM-YYYY HH:mm:ss',
  shortDate: 'DD-MM-YYYY HH:mm',
  time: 'HH:mm:ss',
  date: 'DD-MM-YYYY',
};

type FormatType = 'fullDate' | 'shortDate' | 'time' | 'date';

export const localeDate = (
  date: moment.MomentInput,
  format: FormatType,
  timezone = getTimezone(),
) => {
  const formatDisplay = FORMATS[format];
  const momentObj = moment(date);
  return momentObj.tz(timezone).format(formatDisplay);
};
