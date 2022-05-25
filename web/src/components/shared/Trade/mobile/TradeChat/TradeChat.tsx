import { FC } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import LeftArrowIcon from 'web/src/assets/svg/LeftArrowIcon.svg';
import VerifiedIcon from 'web/src/assets/svg/VerifiedIcon.svg';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { TradeChat } from 'web/src/components/shared/Trade/TradeChat';
import { OnlineStatusByLastActivity } from 'web/src/components/ui/OnlineStatus';
import { Text } from 'web/src/components/ui/Text';
import * as styles from 'web/src/components/shared/Trade/mobile/TradeChat/TradeChat.css';
import * as buttonStyle from 'web/src/components/traderInfo/TraderHeaderMobile.css';

export const MobileTradeChat: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { trade } = useTradeContext();
  const { t } = useTradeContext();

  return (
    <Box
      className={cn(styles.mobileChat, open && styles.openMobileChat)}
      p="4x"
      display="flex"
      flexDirection="column"
      height="full"
    >
      <Box display="flex" gap="1x" alignItems="center">
        <IconButton className={buttonStyle.goBackButton} onClick={onClose}>
          <LeftArrowIcon />
        </IconButton>
        <Text as="span" fontWeight="strong" fontSize="lead" color="tradeMobileChatTitle">
          {t('Chat with', { partner: trade.partner.name })}
        </Text>
        {trade.partner.verificationStatus === 'VERIFIED' && (
          <Box w="5x" h="5x">
            <VerifiedIcon />
          </Box>
        )}
      </Box>

      <Box>
        <OnlineStatusByLastActivity lastActivity={trade.partner.lastActivity} />
      </Box>

      <Box h="full" display="flex">
        <TradeChat />
      </Box>
    </Box>
  );
};
