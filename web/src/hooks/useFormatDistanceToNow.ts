import { useLanguage, useUser } from 'web/src/components/app/AppContext';
import { formatDistanceToNow } from 'web/src/helpers/relativeTime';

export const useFormatDistanceToNow = () => {
  const user = useUser();
  const locale = useLanguage();

  return (input: moment.MomentInput) =>
    formatDistanceToNow(input, {
      timezone: user?.bitzlato_user?.user_profile.timezone ?? undefined,
      locale,
    });
};
