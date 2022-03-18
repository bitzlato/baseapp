import { FC } from 'react';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { MergeDirection, MergeWithTelegramWizard } from './MergeWithTelegramWizard';
// import * as s from './MergeWithTelegramWizardModal.css';

interface Props {
  direction?: MergeDirection | undefined;
  started: boolean;
  onClose: () => void;
}

export const MergeWithTelegramWizardModal: FC<Props> = ({ direction, started, onClose }) => {
  const t = useT();

  return (
    <Modal show={started} onClose={onClose}>
      <ModalHeader>
        {direction === 'web' ? t('merge.web_title') : t('merge.telegram_title')}
      </ModalHeader>
      <MergeWithTelegramWizard direction={direction} onClose={onClose} />
    </Modal>
  );
};
