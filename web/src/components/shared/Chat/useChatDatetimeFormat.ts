import { useAppContext } from 'web/src/components/app/AppContext';
import { localeDate } from 'web/src/helpers/localeDate';
import { formatDistanceToNow } from 'web/src/helpers/relativeTime';

const SHOW_RELATIVE_TIME_INTERVAL = 60 * 60 * 24 * 1000; // 24 hours

export const useChatDatetimeFormat = () => {
  const { user, lang: locale } = useAppContext();

  return (input: number) => {
    const timezone = user?.bitzlato_user?.user_profile.timezone ?? undefined;

    const now = Date.now();
    const diff = now - input;

    const full = localeDate(input, 'literalFullDate', locale, timezone);
    const relative =
      diff < SHOW_RELATIVE_TIME_INTERVAL
        ? formatDistanceToNow(input, {
            timezone,
            locale,
          })
        : full;

    return { full, relative };
  };
};
