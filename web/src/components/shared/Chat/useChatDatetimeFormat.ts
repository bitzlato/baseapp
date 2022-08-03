import { useEffect, useState } from 'react';
import { useAppContext } from 'web/src/components/app/AppContext';
import { localeDate } from 'web/src/helpers/localeDate';
import { formatDistanceToNow } from 'web/src/helpers/relativeTime';

const SHOW_RELATIVE_TIME_INTERVAL = 60 * 60 * 24 * 1000; // 24 hours

export const useChatDatetimeFormat = (time: number) => {
  const { user, lang: locale } = useAppContext();
  const [, forceRerender] = useState({});

  const timezone = user?.bitzlato_user?.user_profile.timezone ?? undefined;
  const now = Date.now();
  const diff = now - time;

  useEffect(() => {
    let ms = 1000; // 1 second
    if (diff >= 60_000) {
      ms = 60_000; // 1 minute
    } else if (diff >= 3_600_000) {
      ms = 3_600_000; // 1 hour
    } else if (diff >= SHOW_RELATIVE_TIME_INTERVAL) {
      return undefined;
    }

    const interval = setInterval(() => {
      forceRerender({});
    }, ms);

    return () => clearInterval(interval);
  }, [diff]);

  const full = localeDate(time, 'literalFullDate', locale, timezone);
  const relative =
    diff < SHOW_RELATIVE_TIME_INTERVAL
      ? formatDistanceToNow(time, {
          timezone,
          locale,
        })
      : full;

  return { full, relative };
};
