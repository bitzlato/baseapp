import { FC, useState } from 'react';
import { useP2PDeleteApiKey } from 'web/src/hooks/mutations/useP2PDeleteApiKey';
import { Modal, ModalBody, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import CrossSmallIcon from 'web/src/assets/svg/CrossIcon.svg';
import { P2PApiKey } from 'web/src/modules/user/apiKeys/types';
import { useT } from 'web/src/hooks/useT';

interface Props {
  apiKey: P2PApiKey;
}

export const P2PDeleteApiKey: FC<Props> = ({ apiKey }) => {
  const t = useT();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const [deleteApiKey, { status }] = useP2PDeleteApiKey({ onSuccess: handleClose });

  const handleClickOpen = () => setOpen(true);
  const handleClickDelete = () => deleteApiKey(apiKey.kid);

  return (
    <>
      <Button variant="text" color="clarified" size="small" onClick={handleClickOpen}>
        <Box as="span" mr="2x">
          <CrossSmallIcon width="16" height="16" />
        </Box>
        {t('page.body.profile.apiKeys.modal.btn.delete')}
      </Button>
      <Modal show={open} onClose={handleClose}>
        <ModalHeader>{t('page.body.profile.apiKeys.modal.btn.delete')}?</ModalHeader>
        <ModalBody loading={status === 'running'}>{t('p2p.apiKeys.delete_irreversible')}</ModalBody>
        <Box display="flex" alignItems="center" px="6x" py="4x">
          <Button
            color="secondary"
            disabled={status === 'running'}
            fullWidth
            onClick={handleClickDelete}
          >
            {t('page.body.profile.apiKeys.modal.btn.delete')}
          </Button>
          <Box w="4x" flexShrink={0} />
          <Button color="secondary" variant="outlined" fullWidth onClick={handleClose}>
            {t('Close')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
