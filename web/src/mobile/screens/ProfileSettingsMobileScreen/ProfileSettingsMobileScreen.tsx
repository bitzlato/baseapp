import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { ProfileSettings } from 'web/src/components/profile/settings/ProfileSettings';

export const ProfileSettingsMobileScreen: FC = () => {
  return (
    <Box my="1x">
      <ProfileSettings />
    </Box>
  );
};
