import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentMarket, selectMarkets } from '../../modules';
import { ControlledTradingChart } from './ControlledTradingChart';

export const TradingChart: FC = () => {
  const markets = useSelector(selectMarkets);
  const currentMarket = useSelector(selectCurrentMarket);

  return <ControlledTradingChart currentMarket={currentMarket?.id} markets={markets} />;
};
