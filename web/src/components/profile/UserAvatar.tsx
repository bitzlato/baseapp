import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import DefaultAvatar from 'web/src/assets/svg/DefaultAvatar.svg';
import { Spinner } from 'web/src/components/ui/Spinner';
import * as s from './UserAvatar.css';

interface UserAvatarProps {
  image: string;
  isLoading?: boolean;
}

export const UserAvatar: FC<UserAvatarProps> = ({ image, isLoading }) => {
  const re = /avatar\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]+)/g;
  const result = re.exec(image);
  const avatarUrl =
    result && result?.length > 0 ? `https://static.bitzlato.com/avatars/${result[1]}.jpg` : image;

  return (
    <Box
      position="relative"
      borderRadius="2x"
      borderWidth="1x"
      borderColor="modalHeaderBorderBottom"
      borderStyle="solid"
      className={s.avatarBox}
    >
      {isLoading && (
        <Box position="absolute" className={s.avatarSpinner}>
          <Spinner />
        </Box>
      )}
      {image !== '' ? (
        <img src={avatarUrl} alt="Profile avatar" className={s.avatarImage} />
      ) : (
        <DefaultAvatar />
      )}
    </Box>
  );
};
