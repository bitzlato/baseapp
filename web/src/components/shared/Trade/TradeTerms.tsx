import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Divider } from 'web/src/components/shared/Divider';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { Text } from 'src/components/ui/Text';

export const TradeTerms: FC = () => {
  const { t } = useTradeContext();
  const { trade } = useTradeContext();

  return (
    <Box borderRadius="1.5x" backgroundColor="tradeTermsBackground">
      <Box py="5x" px="4x">
        <Text fontSize="large" color="secondary">
          {t('trade.terms.history')}
        </Text>
      </Box>
      <Divider />
      <Box py="5x" px="6x">
        <Text fontSize="medium" whiteSpace="pre-line">
          {trade.terms || t('trade.terms.history.empty')}
        </Text>
      </Box>
    </Box>
  );
};
