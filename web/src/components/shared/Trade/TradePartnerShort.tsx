import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Text } from 'src/components/ui/Text';
import { ActionOnTraderButton } from 'web/src/components/p2p/ActionOnTraderButton';
import { OnlineStatusByLastActivity } from 'web/src/components/ui/OnlineStatus';
import { getLinkToP2PUser } from 'web/src/components/shared/Ads/getLinkToP2PUser';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { TraderIcons } from 'web/src/components/traderInfo/TraderIcons';

export const TradePartnerShort: FC = () => {
  const { trade, handleTrustUser } = useTradeContext();
  const { t } = useTradeContext();
  const { isMobileDevice, lang } = useAppContext();
  const { Link } = useAdapterContext();

  const trustUser = () => {
    handleTrustUser(!trade.partner.trusted, trade.partner.name);
  };

  const trustButton = (
    <ActionOnTraderButton
      variant="trust"
      active={trade.partner.trusted ?? false}
      title={t('Add to trusted')}
      activeTitle={t('Remove from trusted')}
      onClick={trustUser}
    />
  );

  const traderIcons = <TraderIcons traderInfo={trade.partner} />;

  if (isMobileDevice) {
    return (
      <Box backgroundColor="tradeMobileInfoBackgroundPrimary" borderRadius="1.5x" py="2x" px="4x">
        <Box as="span" fontWeight="strong" fontSize="caption" color="tradeMobilePartnerTitleColor">
          {t('Trader')}
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap="2x">
            <Box
              as={Link}
              to={getLinkToP2PUser({ lang, userName: trade.partner.name })}
              color={{ default: 'adTrader', hover: 'adTrader' }}
              display="block"
              textOverflow="ellipsis"
              fontWeight="strong"
              fontSize="lead"
            >
              {trade.partner.name}
            </Box>
            {traderIcons}
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
          <Box
            as={Link}
            to={getLinkToP2PUser({ lang, userName: trade.partner.name })}
            color={{ default: 'adTrader', hover: 'adTrader' }}
            display="block"
            textOverflow="ellipsis"
            fontWeight="strong"
            fontSize="lead"
          >
            {trade.partner.name}
          </Box>
          {traderIcons}
        </Box>

        <Box>{trustButton}</Box>
      </Box>
      <Box mb="5x">
        <OnlineStatusByLastActivity lastActivity={trade.partner.lastActivity} />
      </Box>
    </Box>
  );
};
