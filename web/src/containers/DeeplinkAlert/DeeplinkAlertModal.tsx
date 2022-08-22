import { FC } from 'react';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { useDeeplinkAlertContext } from './DeeplinkAlertContext';

export const DeeplinkAlertModal: FC = () => {
  const t = useT();
  const { alert, setAlert } = useDeeplinkAlertContext();

  const handleClose = () => {
    setAlert(null);
  };

  if (!alert) {
    return null;
  }

  return (
    <Modal show onClose={handleClose}>
      <ModalHeader>{t('Attention!')}</ModalHeader>
      <ModalBody>
        <Text>{t(alert)}</Text>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" fullWidth onClick={handleClose}>
          {t('OK')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
