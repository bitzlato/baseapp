import { FC, useCallback } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import LeftArrowIcon from 'web/src/assets/svg/LeftArrowIcon.svg';
import VerifiedIcon from 'web/src/assets/svg/VerifiedIcon.svg';
import * as styles from 'web/src/components/shared/Trade/mobile/TradeChat/TradeChat.css';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { TradeChat } from 'web/src/components/shared/Trade/TradeChat';
import * as buttonStyle from 'web/src/components/traderInfo/TraderHeaderMobile.css';

export const MobileTradeChat: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { trade } = useTradeContext();
  const { t } = useTradeContext();
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const isOnline = Date.now() - new Date(trade.partner.lastActivity).getSeconds() < 60000 * 5;

  return (
    <Box
      className={cn(styles.mobileChat, open && styles.openMobileChat)}
      p="4x"
      display="flex"
      flexDirection="column"
      height="full"
    >
      <Box display="flex" gap="1x" alignItems="center">
        <IconButton className={buttonStyle.goBackButton} onClick={handleClose}>
          <LeftArrowIcon />
        </IconButton>
        <Box as="span" fontWeight="strong" fontSize="lead" color="tradeMobileChatTitle">
          {t('Chat with', { partner: trade.partner.name })}
        </Box>
        {trade.partner.verificationStatus === 'VERIFIED' && <VerifiedIcon />}
      </Box>

      <Box display="flex" alignItems="center">
        {isOnline ? (
          <Box width="2x" height="2x" borderRadius="circle" backgroundColor="success" mr="2x" />
        ) : (
          <Box width="2x" height="2x" borderRadius="circle" backgroundColor="warning" mr="2x" />
        )}
        <Box as="span">{isOnline ? t('trader.block.online') : t('trader.block.offline')}</Box>
      </Box>

      <Box h="full" display="flex">
        <TradeChat />
      </Box>
    </Box>
  );
};
