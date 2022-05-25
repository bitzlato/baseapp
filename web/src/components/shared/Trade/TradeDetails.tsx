import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useTradeContext } from './TradeContext';
import { AdsType } from './types';

export const TradeDetails: FC = () => {
  const { trade, t } = useTradeContext();

  if (trade.type === AdsType.selling) {
    return (
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        backgroundColor="tradeCurrenciesBackground"
        py="5x"
        px="6x"
        borderRadius="1.5x"
      >
        <Box as="span" fontSize="large" color="tradeCurrenciesTitleColor">
          {t('Details')}
        </Box>
        <Box as="span" fontSize="lead" color="tradeCurrenciesValueColor">
          {trade.counterDetails}
        </Box>
      </Box>
    );
  }

  return null;
};
