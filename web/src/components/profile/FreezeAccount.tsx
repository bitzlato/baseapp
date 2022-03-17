import { FC, useState } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { useFreezeProfile } from 'web/src/hooks/mutations/useFreezeProfile';
import { FreezeAccountContent } from './FreezeAccountСontent';
import * as s from './FreezeAccount.css';

interface Props {
  isSelfFrozen: boolean;
}

export const FreezeAccount: FC<Props> = ({ isSelfFrozen }) => {
  const t = useT();
  const [open, setOpen] = useState(false);
  const { freezeAccount, reset, status } = useFreezeProfile();

  const handleClick = () => {
    reset();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleClickFreeze = () => freezeAccount();

  return (
    <>
      <Button color="secondary" disabled={isSelfFrozen} onClick={handleClick}>
        {t('Freeze Account')}
      </Button>
      <Modal size="lg" show={open} onClose={handleClose}>
        <ModalHeader>{t('Freeze Account')}</ModalHeader>
        <Box
          fontSize="medium"
          mx="6x"
          py="4x"
          borderTopWidth="1x"
          borderColor="modalHeaderBorderBottom"
          borderTopStyle="solid"
          className={s.contentBox}
        >
          <FreezeAccountContent status={status} />
        </Box>
        <Box display="flex" alignItems="center" px="6x" py="4x">
          {status !== 'success' ? (
            <Button
              color="secondary"
              disabled={status === 'running'}
              fullWidth
              onClick={handleClickFreeze}
            >
              {t('Freeze')}
            </Button>
          ) : (
            <Box display="flex" width="full" />
          )}
          <Box w="4x" flexShrink={0} />
          <Button color="secondary" variant="outlined" fullWidth onClick={handleClose}>
            {t('Close')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
