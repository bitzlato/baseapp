import { FC, useCallback } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { useTradeAction, useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { Button } from 'web/src/components/ui/Button';
import { useAppContext } from 'web/src/components/app/AppContext';

export const TradeCancelModal: FC = () => {
  const { t } = useTradeContext();
  const { isMobileDevice } = useAppContext();
  const { trade, toggleModal, modals } = useTradeContext();
  const { confirmCancel } = modals;

  const toggleConfirmCancelModal = useCallback(() => {
    toggleModal('confirmCancel');
  }, [toggleModal]);

  const handleClose = () => {
    toggleConfirmCancelModal();
  };

  const tradeAction = useTradeAction();
  const handleCancel = () => {
    tradeAction('cancel');
    handleClose();
  };

  const message1 = (
    <Box>
      <Box as="span" fontSize="medium">
        {t('trade.modal.cancel.action.1')}
      </Box>

      <br />
      <Box as="span" fontSize="large" fontWeight="strong">
        {` ${t('trade.modal.cancel.action.2')} `}
      </Box>

      <Box as="span" fontSize="medium">
        {t('trade.modal.cancel.action.3', {
          tradeId: trade.id,
          code: trade.currency.code,
          amount: trade.currency.amount,
          paymethod: trade.paymethod.description,
        })}
      </Box>
    </Box>
  );

  const message2 =
    trade.status === 'confirm_trade' ? (
      <Box as="span" fontSize="medium">
        {t('trade.modal.cancel.action_sure', {
          ccode: trade.cryptocurrency.code,
          camount: trade.cryptocurrency.amount,
          code: trade.currency.code,
          amount: trade.currency.amount,
        })}
      </Box>
    ) : null;

  return (
    <Modal show={confirmCancel} onClose={handleClose} size="lg">
      <ModalHeader>
        <Box textAlign="center">
          <Box as="span" fontSize="large" fontWeight="strong">
            {t('trade.modal.cancel.title')}
          </Box>
        </Box>
      </ModalHeader>
      <ModalBody>
        <Box
          textAlign="center"
          px={isMobileDevice ? '5x' : '13x'}
          display="flex"
          flexDirection="column"
          gap="8x"
        >
          {message1}
          {message2}
        </Box>
      </ModalBody>
      <ModalFooter>
        <Box
          w="full"
          display="flex"
          flexDirection={isMobileDevice ? 'column-reverse' : 'row'}
          mt="7x"
        >
          <Box w="full">
            <Button fullWidth color="secondary" variant="outlined" onClick={handleClose}>
              {t('Cancel')}
            </Button>
          </Box>
          <Box mx="1x" my="1x" />
          <Box w="full">
            <Button fullWidth color="secondary" onClick={handleCancel}>
              {t('trade.modal.cancel.button')}
            </Button>
          </Box>
        </Box>
      </ModalFooter>
    </Modal>
  );
};
