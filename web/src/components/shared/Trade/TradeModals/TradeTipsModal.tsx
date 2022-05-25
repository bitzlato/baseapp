import { FC, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { useFetchP2PWallet } from 'web/src/hooks/data/useFetchP2PWallets';

const tipValues = {
  '0.3%': 0.003,
  '0.6%': 0.006,
  '0.9%': 0.009,
};

export const TradeTipsModal: FC = () => {
  const { t } = useTradeContext();
  const { toggleModal, handleTradeTips, modals, trade } = useTradeContext();
  const { tips } = modals;

  const [selectedTip, setSelectedTip] = useState<keyof typeof tipValues | null>(null);

  const cryptocurrency = trade.cryptocurrency.code;

  const { data: p2pWallet } = useFetchP2PWallet(cryptocurrency);

  const balance = p2pWallet?.balance;

  const handleSelectTip = (key: keyof typeof tipValues) => setSelectedTip(key);

  const handleClose = () => {
    toggleModal('tips');
  };

  const handleLeaveTip = () => {
    if (selectedTip) {
      const tip = tipValues[selectedTip];
      handleTradeTips(tip);
    }
  };

  return (
    <Modal show={tips} onClose={handleClose}>
      <ModalHeader />
      <ModalBody>
        <Box display="flex" flexDirection="column" gap="4x">
          <Box as="span" fontSize="large" textAlign="center" fontWeight="strong">
            {t('trade.modal.tips.title')}
            <br />
            {t('trade.modal.tips.action')}
          </Box>

          <Box as="span" fontSize="medium" color="tradeTipsModalDescription" textAlign="center">
            {t('trade.modal.tips.description')}
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="1x"
            backgroundColor="tradeTipsModalBalanceBackground"
            borderStyle="dashed"
            borderColor="tradeTipsModalBalanceBorderColor"
            borderWidth="1x"
            p="3x"
            borderRadius="1.5x"
            my="4x"
          >
            <Box as="span" color="tradeTipsModalTitle">
              {t('Available')}
            </Box>

            <Box as="span" fontSize="lead" color="tradeTipsModalDescription">
              {balance} {cryptocurrency}
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap="1x">
            <Box as="span" color="tradeTipsModalTitle">
              {t('trade.modal.tips.percent')}
            </Box>

            <Box display="flex" flexDirection="row" gap="3x">
              <Button
                fullWidth
                color={selectedTip === '0.3%' ? 'primary' : 'clarified'}
                onClick={() => handleSelectTip('0.3%')}
              >
                0.3%
              </Button>
              <Button
                fullWidth
                color={selectedTip === '0.6%' ? 'primary' : 'clarified'}
                onClick={() => handleSelectTip('0.6%')}
              >
                0.6%
              </Button>
              <Button
                fullWidth
                color={selectedTip === '0.9%' ? 'primary' : 'clarified'}
                onClick={() => handleSelectTip('0.9%')}
              >
                0.9%
              </Button>
            </Box>
          </Box>
        </Box>
      </ModalBody>
      <ModalFooter>
        <Box display="flex" w="full" gap="5x" mt="3x">
          <Button fullWidth color="secondary" variant="outlined" onClick={handleClose}>
            {t('Close')}
          </Button>

          <Button fullWidth color="secondary" onClick={handleLeaveTip} disabled={!selectedTip}>
            {t('Send')}
          </Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};
