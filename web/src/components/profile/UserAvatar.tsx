import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import DefaultAvatar from 'web/src/assets/svg/DefaultAvatar.svg';
import { Spinner } from 'web/src/components/ui/Spinner';
import * as s from './UserAvatar.css';

interface UserAvatarProps {
  image: string;
  isLoading?: boolean;
}

export const UserAvatar: FC<UserAvatarProps> = ({ image, isLoading }) => (
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
      <img src={image} alt="Profile avatar" className={s.avatarImage} />
    ) : (
      <DefaultAvatar />
    )}
  </Box>
);
