import { FC, useMemo } from 'react';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import { MobileTabs } from 'web/src/components/shared/Trade/types';
import { useTradeContext } from '../TradeContext';

interface IMobileTradeTab {
  tab: MobileTabs;
  onChange: (newTab: string) => void;
}

export const MobileTradeTab: FC<IMobileTradeTab> = ({ tab, onChange }) => {
  const { t } = useTradeContext();

  const variants = useMemo(
    () => [
      {
        label: t('trade.mobile.tab.trader'),
        value: 'trader',
      },
      {
        label: t('trade.mobile.tab.trade'),
        value: 'trade',
      },
    ],
    [t],
  );

  return <VariantSwitcher target="tabs" variants={variants} value={tab} onChange={onChange} />;
};
