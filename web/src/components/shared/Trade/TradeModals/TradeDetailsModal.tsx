import { FC, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/ui/Box';
import { useFetchLastRequisites } from 'web/src/hooks/data/useFetchTrade';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import { DetailsInput } from 'web/src/components/TextInputCustom/DetailsInput';

interface ITradeDetailsModal {
  confirm: (value: string) => void;
  onClose: () => void;
  paymethodId: number;
}

export const TradeDetailsModal: FC<ITradeDetailsModal> = ({ confirm, onClose, paymethodId }) => {
  const t = useSharedT();
  const { isMobileDevice } = useAppContext();
  const [details, setDetails] = useState('');

  const { data } = useFetchLastRequisites(paymethodId);

  const lastDetails = data?.data || [];

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    confirm(details);
  };

  return (
    <Modal show onClose={handleClose}>
      <ModalHeader />
      <ModalBody>
        <Box display="flex" flexDirection="column" textAlign="center" gap="4x">
          <Box as="span" fontSize="lead">
            {t('trade.modal.details.title')}
          </Box>
          <Box as="span" fontSize="medium">
            {t('trade.modal.details.action')}
          </Box>

          <DetailsInput onChangeDetails={setDetails} details={details} lastDetails={lastDetails} />
        </Box>
      </ModalBody>
      <ModalFooter>
        <Box
          w={isMobileDevice ? 'full' : 'auto'}
          mx={isMobileDevice ? '0' : 'auto'}
          py={isMobileDevice ? '6x' : '4x'}
        >
          <Button fullWidth onClick={handleConfirm} color="secondary" disabled={!details}>
            {t('Confirm')}
          </Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};
