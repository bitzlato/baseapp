import { FC, useCallback } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import WarningTriangleIcon from 'web/src/assets/svg/WarningTriangleIcon.svg';
import { useTradeAction, useTradeContext } from 'web/src/components/shared/Trade/TradeContext';

export const TradeConfirmReceiveMoneyModal: FC = () => {
  const { t } = useTradeContext();
  const { trade, toggleModal, modals } = useTradeContext();
  const tradeAction = useTradeAction();
  const { confirmPayment } = modals;

  const toggleConfirmPaymentModal = useCallback(() => {
    toggleModal('confirmPayment');
  }, [toggleModal]);

  const handleClose = () => {
    toggleConfirmPaymentModal();
  };

  const tradeActionConfirmPayment = () => {
    tradeAction('confirm-payment');
    handleClose();
  };

  return (
    <Modal show={confirmPayment} onClose={handleClose}>
      <ModalHeader />
      <ModalBody>
        <Box display="flex" flexDirection="column" gap="5x">
          <Box display="flex" justifyContent="center" alignItems="center">
            <WarningTriangleIcon />
          </Box>
          <Box as="span" textAlign="center" fontWeight="strong" fontSize="large">
            {t('trade.modal.receive_money.sure', {
              amount: trade.currency.amount,
              code: trade.currency.code,
            })}
          </Box>
          <Box as="span" textAlign="center" fontSize="medium">
            {t('trade.modal.receive_money.no_refund', {
              cryptoamount: trade.cryptocurrency.amount,
              ccode: trade.cryptocurrency.code,
            })}
          </Box>
        </Box>
      </ModalBody>
      <ModalFooter>
        <Box display="flex" w="full" gap="5x">
          <Box flexGrow={1}>
            <Button fullWidth color="secondary" onClick={tradeActionConfirmPayment}>
              {t('Yes')}
            </Button>
          </Box>
          <Box flexGrow={1}>
            <Button fullWidth color="secondary" variant="outlined">
              {t('No')}
            </Button>
          </Box>
        </Box>
      </ModalFooter>
    </Modal>
  );
};
