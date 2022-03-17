import moment from 'moment-timezone';

const timezones = import('timezones.json');

export interface TimezoneItem {
  value: string;
  offset: number;
  offsetText: string;
  label: string;
  name?: string | undefined;
  abbr: string;
  timezones: readonly string[];
}

const DAYLIGHT_TIMEZONES_REPLACEMENT = [
  // daylight timezones
  ['Pacific Daylight Time', 'British Summer Time'],
  // standard timezones
  ['Pacific Standard Time', 'GMT Standard Time'],
] as const;
const IGNORE_TIMEZONE = ['Kamchatka Standard Time', 'E. Europe Standard Time'] as const;

const offsetHoursToText = (offset: number): string => {
  const isNegative = offset < 0;
  const remainder = offset % 1;
  const hours = Math.abs(offset - remainder).toString();
  const minutes = Math.abs(remainder * 60).toString();

  return `UTC${isNegative ? '-' : '+'}${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

let timezoneList: readonly TimezoneItem[] | undefined;
export const fetchTimezoneList = async (): Promise<readonly TimezoneItem[]> => {
  if (timezoneList === undefined) {
    // memoized
    timezoneList = (await timezones).default
      .reduce<TimezoneItem[]>((list, { value, abbr, offset, text, utc, isdst }) => {
        const timezone = utc[0];
        if (!timezone || IGNORE_TIMEZONE.includes(value as any)) {
          return list;
        }

        let isDaylightOffset = false;
        if (isdst) {
          const datetime = moment().tz(timezone);
          if (!datetime.isDST()) {
            if (DAYLIGHT_TIMEZONES_REPLACEMENT[0].includes(value as any)) {
              return list;
            }

            isDaylightOffset = true;
          }
        } else if (DAYLIGHT_TIMEZONES_REPLACEMENT[1].includes(value as any)) {
          const datetime = moment().tz(timezone);
          if (datetime.isDST()) {
            return list;
          }
        }

        const finalOffset = isDaylightOffset ? offset - 1 : offset;
        const offsetText = offsetHoursToText(finalOffset);
        const [, name] = text.match(/\(.*\)\s(.+)/) ?? [];
        const timezoneItem: TimezoneItem = {
          value: `${value}-${abbr}`,
          offset: finalOffset,
          offsetText,
          label: `${offsetText}-${name}`,
          name,
          abbr,
          timezones: utc,
        };

        return list.concat(timezoneItem);
      }, [])
      .sort((a, b) => {
        if (a.offset === b.offset) {
          return 0;
        }

        return a.offset < b.offset ? -1 : 1;
      });
  }

  return timezoneList;
};
