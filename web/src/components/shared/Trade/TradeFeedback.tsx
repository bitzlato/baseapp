import { FC } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useAppContext } from 'web/src/components/app/AppContext';
import { useTradeContext } from './TradeContext';
import * as s from './TradeFeedback.css';

type Props = {
  tipsAvailable: boolean;
};

export const TradeFeedback: FC<Props> = ({ tipsAvailable }) => {
  const { t, handleTradeFeedback, toggleModal } = useTradeContext();
  const { isMobileDevice } = useAppContext();

  const handleTipsClick = () => {
    toggleModal('tips');
  };

  return (
    <Box w={isMobileDevice ? 'full' : 'auto'}>
      <Box textAlign="right" pb="2x">
        <Text as="span" fontSize="medium" fontWeight="strong" color="tradeMainComponentTitle">
          {t('trade.state.leave_feedback')}
        </Text>
      </Box>
      <Box className={s.feedbackBlock}>
        <Box display="flex" gap="2x" w="full">
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={() => handleTradeFeedback('thumb_up')}
          >
            🙂
          </Button>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={() => handleTradeFeedback('weary')}
          >
            😐
          </Button>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={() => handleTradeFeedback('hankey')}
          >
            😖
          </Button>
        </Box>

        {tipsAvailable && (
          <Box w="full">
            <Button fullWidth onClick={handleTipsClick}>
              {t('trade.state.button.tips')}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
