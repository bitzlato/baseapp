import { FC, useMemo, useState } from 'react';
import { useT } from 'src/hooks/useT';
import { ControlledTradingChart } from 'web/src/containers/TradingChart/ControlledTradingChart';
import { TradingViewMarket } from 'web/src/containers/TradingChart/api';
import { Button } from 'web/src/components/ui/Button';
import { MarketSelectorP2P } from 'web/src/containers/MarketSelector/MarketSelectorP2P';

import s from './WelcomeBlock.postcss';

const MARKETS: TradingViewMarket[] = [
  {
    id: 'BTC_Sberbank',
    name: 'BTC/Sberbank',
    quote_unit: 'RUB',
    price_precision: 2,
  },
  {
    id: 'BTC_QIWI',
    name: 'BTC/QIWI',
    quote_unit: 'RUB',
    price_precision: 2,
  },
  {
    id: 'BTC_Tinkoff',
    name: 'BTC/Tinkoff',
    quote_unit: 'RUB',
    price_precision: 2,
  },
];

export const TradingStatisticsP2P: FC = () => {
  const t = useT();

  const [currentMarket, setCurrentMarket] = useState(MARKETS[0]!);

  const p2pMarketLink = useMemo(() => {
    const [crypto, paymethod] = currentMarket.id.toLowerCase().split('_');
    const fiat = currentMarket.quote_unit.toLowerCase();
    return `/p2p/buy-${crypto}-${fiat}-${paymethod}`;
  }, [currentMarket]);

  return (
    <div className={s.tradingStatistics}>
      <div className={s.tradingStatisticsHeaderP2P}>
        <div className={s.tradingStatisticsSelectorP2P}>
          <MarketSelectorP2P options={MARKETS} value={currentMarket} onChange={setCurrentMarket} />
        </div>
        <Button as="a" href={p2pMarketLink}>
          {t('Start P2P Trading')}
        </Button>
      </div>
      <div className={s.tradingStatisticsChart}>
        <ControlledTradingChart
          currentMarket={currentMarket.id}
          markets={MARKETS}
          marketKind="p2p-k-line"
        />
      </div>
    </div>
  );
};
