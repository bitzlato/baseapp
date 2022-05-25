import { FC, useCallback, useMemo } from 'react';
import { Box } from 'web/src/components/ui/Box';
import VerifiedIcon from 'web/src/assets/svg/VerifiedIcon.svg';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Text } from 'src/components/ui/Text';
import { ActionOnTraderButton } from 'web/src/components/p2p/ActionOnTraderButton';
import { OnlineStatusByLastActivity } from '../../ui/OnlineStatus';

export const TradePartnerShort: FC = () => {
  const { trade, handleTrustUser } = useTradeContext();
  const { t } = useTradeContext();
  const { isMobileDevice } = useAppContext();

  const trustUser = useCallback(() => {
    handleTrustUser(!trade.partner.trusted, trade.partner.name);
  }, [handleTrustUser, trade.partner]);

  const trustButton = useMemo(
    () => (
      <ActionOnTraderButton
        variant="trust"
        active={trade.partner.trusted ?? false}
        title={t('Add to trusted')}
        activeTitle={t('Remove from trusted')}
        onClick={trustUser}
      />
    ),
    [trade.partner, t, trustUser],
  );

  const verifiedIcon = useMemo(
    () => (
      <Box w="5x" h="5x">
        <VerifiedIcon />
      </Box>
    ),
    [],
  );

  if (isMobileDevice) {
    return (
      <Box backgroundColor="tradeMobileInfoBackgroundPrimary" borderRadius="1.5x" py="2x" px="4x">
        <Box as="span" fontWeight="strong" fontSize="caption" color="tradeMobilePartnerTitleColor">
          {t('Trader')}
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap="2x">
            <Box fontSize="lead" as="span" color="tradePartnerColor">
              {trade.partner.name}
            </Box>
            {trade.partner.verificationStatus === 'VERIFIED' && verifiedIcon}
          </Box>

          <Box>{trustButton}</Box>
        </Box>
        <Box>
          <OnlineStatusByLastActivity lastActivity={trade.partner.lastActivity} />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Text color="tradePartnerTitleColor" fontSize="medium">
        {t('Trader')}
      </Text>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap="2x">
          <Text fontSize="lead" color="tradePartnerColor">
            {trade.partner.name}
          </Text>
          {trade.partner.verificationStatus === 'VERIFIED' && verifiedIcon}
        </Box>

        <Box>{trustButton}</Box>
      </Box>
      <Box mb="5x">
        <OnlineStatusByLastActivity lastActivity={trade.partner.lastActivity} />
      </Box>
    </Box>
  );
};
