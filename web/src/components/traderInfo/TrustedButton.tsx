import { FC } from 'react';
import cn from 'classnames';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { useSharedT } from 'web/src/components/shared/Adapter';
import FavoriteIcon from 'web/src/assets/svg/FavoriteIcon.svg';
import FavoriteIconActive from 'web/src/assets/svg/FavoriteIconActive.svg';
import * as s from './TraderInfo.css';

interface Props {
  trusted: boolean | null;
  onClick: () => void;
}

export const TrustedButton: FC<Props> = ({ trusted, onClick }) => {
  const t = useSharedT();
  return (
    <IconButton
      title={trusted ? t('Remove from trusted') : t('Add to trusted')}
      onClick={onClick}
      className={cn(s.iconButton, trusted && s.favorited)}
    >
      {trusted ? <FavoriteIconActive /> : <FavoriteIcon />}
    </IconButton>
  );
};
