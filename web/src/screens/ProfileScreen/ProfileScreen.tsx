import { FC } from 'react';
import { Box } from 'web/src/components/Box/Box';
import { useDocumentTitle } from 'web/src/hooks/useDocumentTitle';
import { useT } from 'web/src/hooks/useT';
import { ProfileAccountActivity } from 'web/src/containers/ProfileAccountActivity';
import { Profile } from 'web/src/components/profile/Profile';
import { ProfileSettings } from 'web/src/components/profile/settings/ProfileSettings';
import { ApiKeys } from 'web/src/components/profile/ApiKeys';
import { Reports } from 'web/src/components/profile/reports/Reports';
import { MergeWithTelegram } from 'web/src/components/profile/mergeWithTelegram/MergeWithTelegram';
import { useIsUserActivated } from 'web/src/components/app/UserContext';

export const ProfileScreen: FC = () => {
  const t = useT();
  const isUserActivated = useIsUserActivated();
  const title = t('page.body.profile.header.account');

  useDocumentTitle(title);

  return (
    <Box my="7">
      <Profile />
      <MergeWithTelegram />
      {isUserActivated && (
        <>
          <ProfileSettings />
          <Reports />
          <ApiKeys />
          <ProfileAccountActivity />
        </>
      )}
    </Box>
  );
};
