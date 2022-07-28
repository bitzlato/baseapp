import { FC, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/ui/Box';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import { TextAreaInput } from 'web/src/components/TextInputCustom/TextInputCustom';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';

export const TradeDisputeReasonModal: FC = () => {
  const t = useSharedT();
  const { isMobileDevice } = useAppContext();
  const { modals, toggleModal, handleOpenDispute } = useTradeContext();
  const { disputeReason } = modals;
  const [reason, setReason] = useState('');

  const handleClose = () => toggleModal('disputeReason');
  const handleConfirm = () => handleOpenDispute(reason || undefined);

  return (
    <Modal show={disputeReason} onClose={handleClose}>
      <ModalHeader />
      <ModalBody>
        <Box display="flex" flexDirection="column" textAlign="center" gap="4x">
          <Box as="span" fontSize="lead">
            {t('trade.modal.dispute.title')}
          </Box>
          <Box as="span" fontSize="medium">
            {t('trade.modal.dispute.action')}
          </Box>
          <TextAreaInput rows={5} onChange={(value) => setReason(value)} />
        </Box>
      </ModalBody>
      <ModalFooter>
        <Box w={isMobileDevice ? 'full' : 'auto'} mx={isMobileDevice ? '0' : 'auto'}>
          <Button fullWidth onClick={handleConfirm} color="secondary">
            {t('trade.modal.dispute.button')}
          </Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};
