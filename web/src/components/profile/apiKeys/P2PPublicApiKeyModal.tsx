import { FC, useState } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import CopyLinealIcon from 'web/src/assets/svg/CopyLinealIcon.svg';
import { CopyField } from 'web/src/components/ui/CopyField';

interface Props {
  publicKey: string;
}

export const P2PPublicApiKeyModal: FC<Props> = ({ publicKey }) => {
  const t = useT();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="text" color="clarified" size="small" onClick={handleClickOpen}>
        <Box as="span" mr="2x">
          <CopyLinealIcon width="16" height="16" />
        </Box>
        {t('page.body.profile.apiKeys.modal.btn.show')}
      </Button>
      <Modal size="lg" show={open} onClose={handleClose}>
        <ModalHeader>{t('Public key')}</ModalHeader>
        <ModalBody>
          <CopyField value={publicKey} multiline />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            {t('Close')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
