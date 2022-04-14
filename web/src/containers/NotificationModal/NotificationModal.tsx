import * as React from 'react';
import { useT } from 'web/src/hooks/useT';
import { Button } from 'web/src/components/ui/Button';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { NotificationModalProps } from './types';

export const NotificationModal: React.FC<NotificationModalProps> = (props) => {
  const t = useT();
  const { notification, handleClose } = props;

  return (
    <Modal show onClose={handleClose}>
      <ModalHeader>
        <b>{t('notifications.modal.header')}</b>
      </ModalHeader>
      <ModalBody>
        <p>{notification?.text}</p>
        <p>{notification?.alert}</p>
      </ModalBody>
      <ModalFooter>
        <Button fullWidth onClick={handleClose}>
          {t('OK')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
