import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import { Tabs } from 'web/src/components/shared/Trade/types';
import { TradeUnreadChatMessages } from 'web/src/components/shared/Trade/TradeUnreadChatMessages';
import { useTradeContext } from './TradeContext';

interface ITradeTab {
  tab: Tabs;
  onChange: (newTab: string) => void;
}

export const TradeTab: FC<ITradeTab> = ({ tab, onChange }) => {
  const { t } = useTradeContext();

  const variants = [
    {
      label: (
        <>
          {t('trade.tab.chat')}
          {tab !== 'chat' && (
            <Box as="span" ml="2x">
              <TradeUnreadChatMessages />
            </Box>
          )}
        </>
      ),
      value: 'chat',
    },
    {
      label: t('trade.tab.info'),
      value: 'tradeInfo',
    },
  ];

  return <VariantSwitcher target="tabs" variants={variants} value={tab} onChange={onChange} />;
};
