import { FC, useRef, useState } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { CopyIcon } from 'src/assets/icons/CopyIcon';
import { copy } from 'web/src/helpers/copy';
import CopyLinealIcon from 'web/src/assets/svg/CopyLinealIcon.svg';
import * as s from './P2PPublicApiKeyModal.css';

interface Props {
  publicKey: string;
}

export const P2PPublicApiKeyModal: FC<Props> = ({ publicKey }) => {
  const t = useT();
  const publicRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickCopy = () => {
    if (publicRef.current) {
      copy(publicRef.current);
    }
  };

  return (
    <>
      <Box as={IconButton} display="flex" alignItems="center" onClick={handleClickOpen}>
        <Box as="span" mr="2x">
          <CopyLinealIcon width="16" height="16" />
        </Box>
        {t('page.body.profile.apiKeys.modal.btn.show')}
      </Box>
      <Modal size="lg" show={open} onClose={handleClose}>
        <ModalHeader>{t('Public Key')}</ModalHeader>
        <ModalBody>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Box
                ref={publicRef}
                as="textarea"
                className={s.textareaKey}
                color="text"
                fontSize="small"
                value={publicKey}
                readOnly
              />
            </Box>
            <IconButton onClick={handleClickCopy} title={t('page.body.profile.content.copyLink')}>
              <CopyIcon />
            </IconButton>
          </Box>
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
