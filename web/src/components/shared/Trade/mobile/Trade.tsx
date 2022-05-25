import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { TradeCurrencies } from 'web/src/components/shared/Trade/TradeCurrencies';
import { TradeState } from 'web/src/components/shared/Trade/TradeState';
import { MobileTradeInfo } from 'web/src/components/shared/Trade/mobile/TradeInfo';

export const MobileTrade: FC = () => {
  return (
    <Box display="flex" flexDirection="column" backgroundColor="tradeMainComponent">
      <TradeState />
      <Box
        display="flex"
        flexDirection="column"
        gap="3x"
        p="5x"
        borderRadius="1.5x"
        borderBottomRadius="0"
        backgroundColor="block"
      >
        <TradeCurrencies />
        <MobileTradeInfo />
      </Box>
    </Box>
  );
};
