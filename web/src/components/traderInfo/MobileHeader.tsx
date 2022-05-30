import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Stack } from 'web/src/components/ui/Stack';
import { Text } from 'web/src/components/ui/Text';
import VerifiedIcon from 'web/src/assets/svg/VerifiedIcon.svg';
import LeftArrowIcon from 'web/src/assets/svg/LeftArrowIcon.svg';
import FavoriteIcon from 'web/src/assets/svg/FavoriteIcon.svg';
import { useUserInfo } from 'web/src/hooks/useUserInfo';
import { useT } from 'web/src/hooks/useT';
import { IconButton } from '../IconButton/IconButton';
import * as styles from './MobileHeader.css';

export interface MobileTraderHeaderProps {
  title: string;
  publicName: string;
  onGoBack: () => void;
}

export const MobileTraderHeader: FC<MobileTraderHeaderProps> = ({
  title,
  publicName,
  onGoBack,
}) => {
  const t = useT();
  const { data } = useUserInfo(publicName);
  const isOnline = Date.now() - data.lastActivity < 60000 * 5;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mt="2x">
        <Stack display="flex" marginRight="2x" alignItems="center">
          <IconButton className={styles.goBackButton} size="small" onClick={() => onGoBack?.()}>
            <LeftArrowIcon />
          </IconButton>
          <Text variant="h5" fontWeight="regular">
            {title}
          </Text>
          {data && data.trusted && <VerifiedIcon />}
          {data.trusted && <FavoriteIcon />}
        </Stack>
      </Box>
      <Box display="flex" alignItems="center" mt="4x" mb="2x">
        {isOnline ? (
          <Box width="2x" height="2x" borderRadius="circle" backgroundColor="success" mr="2x" />
        ) : (
          <Box width="2x" height="2x" borderRadius="circle" backgroundColor="warning" mr="2x" />
        )}
        <Text>{isOnline ? t('online') : t('offline')}</Text>
      </Box>
    </Box>
  );
};
