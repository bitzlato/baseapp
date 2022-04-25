import moment from 'moment-timezone';
import { getTimezone } from './timezone';

export const formatDistanceToNow = (
  input: moment.MomentInput,
  options?: { timezone?: string | undefined; locale?: moment.LocaleSpecifier | undefined },
) => {
  let date = moment(input).tz(options?.timezone ?? getTimezone());
  if (options?.locale) {
    date = date.locale(options.locale);
  }

  return date.fromNow();
};
