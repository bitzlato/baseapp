import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { TradingStatistics } from 'web/src/components/tradingStatistics/TradingStatistics';

export const TradingViewScreen: FC = () => {
  const { symbol } = useParams<{ symbol?: string }>();

  return <TradingStatistics initialMarketSymbol={symbol} />;
};
