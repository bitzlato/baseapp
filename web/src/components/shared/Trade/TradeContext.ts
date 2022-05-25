import { createContext, useContext } from 'react';
import { TradeAvailableAction, TradeContextValue } from 'web/src/components/shared/Trade/types';

export const TradeContext = createContext(null as any as TradeContextValue);
export const useTradeContext = () => useContext(TradeContext);

export const useTradeAction = () => {
  const { handleTradeAction } = useTradeContext();
  return (action: TradeAvailableAction) => handleTradeAction(action);
};
