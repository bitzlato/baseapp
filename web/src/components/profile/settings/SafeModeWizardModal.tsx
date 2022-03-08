import { FC } from 'react';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { SafeModeWizard } from './SafeModeWizard';

interface SafeModeWizardModalProps {
  show: boolean;
  onClose: () => void;
}

export const SafeModeWizardModal: FC<SafeModeWizardModalProps> = ({ show, onClose }) => {
  const t = useT();

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>{t('safemode.title')}</ModalHeader>
      <SafeModeWizard onClose={onClose} />
    </Modal>
  );
};
