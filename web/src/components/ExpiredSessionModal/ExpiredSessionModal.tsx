import { FC } from 'react';
import { useT } from 'web/src/hooks/useT';
import { ClockIcon } from 'web/src/assets/images/ClockIcon';
import { Box } from 'web/src/components/Box/Box';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { Button } from 'web/src/components/ui/Button';

interface Props {
  onSubmit: () => void;
  onClose: () => void;
}

export const ExpiredSessionModal: FC<Props> = ({ onClose, onSubmit }) => {
  const t = useT();
  return (
    <Modal show onClose={onClose}>
      <ModalHeader>
        <Box row spacing="2">
          <ClockIcon />
          <span>{t('page.modal.expired.title')}</span>
        </Box>
      </ModalHeader>
      <Box col padding="4">
        <Button onClick={onSubmit}>{t('page.modal.expired.submit')}</Button>
      </Box>
    </Modal>
  );
};
