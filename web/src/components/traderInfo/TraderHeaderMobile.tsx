import { FC } from 'react';
import { TraderIcons } from 'web/src/components/traderInfo/TraderIcons';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import LeftArrowIcon from 'web/src/assets/svg/LeftArrowIcon.svg';
import { UserInfo } from 'web/src/modules/p2p/user.types';
import { OnlineStatusByLastActivity } from 'web/src/components/ui/OnlineStatus';
import * as styles from './TraderHeaderMobile.css';

export interface TraderHeaderMobileProps {
  title: string;
  traderInfo: UserInfo;
  showOnlineStatus: boolean;
  onGoBack: () => void;
}

export const TraderHeaderMobile: FC<TraderHeaderMobileProps> = ({
  title,
  traderInfo,
  showOnlineStatus = false,
  onGoBack,
}) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mt="2x">
        <Box display="flex" alignItems="center" gap="2x">
          <IconButton className={styles.goBackButton} size="small" onClick={() => onGoBack?.()}>
            <LeftArrowIcon />
          </IconButton>
          <Text variant="h5" fontWeight="regular">
            {title}
          </Text>
          <TraderIcons traderInfo={traderInfo} />
        </Box>
      </Box>
      {showOnlineStatus && <OnlineStatusByLastActivity lastActivity={traderInfo.lastActivity} />}
    </Box>
  );
};
