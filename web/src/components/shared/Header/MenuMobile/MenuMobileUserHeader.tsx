import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { User } from 'web/src/modules/user/profile/types';
import DefaultAvatar from 'web/src/assets/svg/DefaultAvatar.svg';
import * as s from './MenuMobileUserHeader.css';

interface Props {
  user: User;
}

export const MenuMobileUserHeader: FC<Props> = ({ user }) => {
  const avatar = user.bitzlato_user?.user_profile.avatar.original;
  const name =
    user.bitzlato_user?.user_profile.public_name ?? user.bitzlato_user?.user_profile.generated_name;

  return (
    <Box display="flex" gap="2x">
      {avatar ? <img className={s.avatar} src={avatar} alt="Profile avatar" /> : <DefaultAvatar />}
      <Box>
        <Text as="p" variant="body" fontWeight="strong">
          {name}
        </Text>
        <Text as="p" variant="caption">
          {user.uid}
        </Text>
      </Box>
    </Box>
  );
};
