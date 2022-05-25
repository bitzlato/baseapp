import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { TradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { TradeCurrencies } from 'web/src/components/shared/Trade/TradeCurrencies';
import { TradeHistory } from 'web/src/components/shared/Trade/TradeHistory';
import { TradeInfo } from 'web/src/components/shared/Trade/TradeInfo';
import { TradePartnerShort } from 'web/src/components/shared/Trade/TradePartnerShort';
import { TradeState } from 'web/src/components/shared/Trade/TradeState';
import { TradeTerms } from 'web/src/components/shared/Trade/TradeTerms';
import { TradeTipsModal } from 'web/src/components/shared/Trade/TradeModals/TradeTipsModal';
import { ISharedTrade } from 'web/src/components/shared/Trade/types';
import { useAppContext } from 'src/components/app/AppContext';
import { MobileTrade } from 'web/src/components/shared/Trade/mobile/Trade';
import { TradeCancelModal } from 'web/src/components/shared/Trade/TradeModals/TradeCancelModal';
import { TradeInputDetails } from 'web/src/components/shared/Trade/TradeInputDetails';
import { TradeConfirmReceiveMoneyModal } from 'web/src/components/shared/Trade/TradeModals/TradeConfirmReceiveMoneyModal';
import { themeDark, themeLight } from 'web/src/theme/vars.css';
import { TradeDetails } from './TradeDetails';

export const SharedTrade: FC<ISharedTrade> = (props) => {
  const gap = '3x';
  const { isMobileDevice } = useAppContext();
  const { theme } = props;
  const themeClassName = theme === 'light' ? themeLight : themeDark;

  return (
    <TradeContext.Provider value={props}>
      <Box className={themeClassName} fontFamily="brand" width="full">
        {isMobileDevice ? (
          <MobileTrade />
        ) : (
          <Box p="3x" display="flex" flexDirection="row" gap={gap}>
            <Box w="70%" display="flex" flexDirection="column" gap={gap} flexShrink={0}>
              <TradeState />
              <TradeDetails />
              <TradeCurrencies />
              <TradeTerms />
              <TradeHistory />
            </Box>
            <Box
              flexGrow={1}
              flexShrink={1}
              backgroundColor="tradeInfoBackground"
              p="5x"
              borderRadius="1.5x"
              display="flex"
              flexDirection="column"
              gap={gap}
            >
              <TradePartnerShort />
              <TradeInfo />
            </Box>
          </Box>
        )}
        <TradeTipsModal />
        <TradeCancelModal />
        <TradeInputDetails />
        <TradeConfirmReceiveMoneyModal />
      </Box>
    </TradeContext.Provider>
  );
};
