import { FC } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useAppContext } from 'web/src/components/app/AppContext';
import SmileFace from 'web/src/assets/svg/SmileFace.svg';
import NeutralFace from 'web/src/assets/svg/NeutralFace.svg';
import SadFace from 'web/src/assets/svg/SadFace.svg';
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
            color="clarified"
            variant="contained"
            title={t('Good')}
            onClick={() => handleTradeFeedback('thumb_up')}
          >
            <SmileFace />
          </Button>
          <Button
            fullWidth
            color="clarified"
            variant="contained"
            title={t('Passable')}
            onClick={() => handleTradeFeedback('weary')}
          >
            <NeutralFace />
          </Button>
          <Button
            fullWidth
            color="clarified"
            variant="contained"
            title={t('Bad')}
            onClick={() => handleTradeFeedback('hankey')}
          >
            <SadFace />
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
