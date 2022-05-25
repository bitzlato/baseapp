import { FC, useMemo } from 'react';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import { Tabs } from 'web/src/components/shared/Trade/types';
import { useTradeContext } from './TradeContext';

interface ITradeTab {
  tab: Tabs;
  onChange: (newTab: string) => void;
}

export const TradeTab: FC<ITradeTab> = ({ tab, onChange }) => {
  const { t } = useTradeContext();

  const variants = useMemo(
    () => [
      {
        label: t('trade.tab.chat'),
        value: 'chat',
      },
      {
        label: t('trade.tab.info'),
        value: 'tradeInfo',
      },
    ],
    [t],
  );

  return <VariantSwitcher target="tabs" variants={variants} value={tab} onChange={onChange} />;
};
