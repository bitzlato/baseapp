import { FC, useState } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { useChangePassword } from 'web/src/hooks/mutations/useChangePassword';

interface ChangePasswordProps {
  email: string;
}

export const ChangePassword: FC<ChangePasswordProps> = ({ email }) => {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [mutate] = useChangePassword({
    onRequestSuccess: () => setOpen(false),
  });
  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickChange = () => mutate({ email });

  return (
    <>
      <Button color="secondary" onClick={handleClick}>
        {t('Password change')}
      </Button>
      <Modal size="lg" show={open} onClose={handleClose}>
        <ModalHeader>{t('Password reset request')}</ModalHeader>
        <Box
          fontSize="medium"
          mx="6x"
          py="4x"
          borderTopWidth="1x"
          borderColor="modalHeaderBorderBottom"
          borderTopStyle="solid"
        >
          <Box display="flex" alignItems="center" mb="4x">
            {t('Password reset info')}
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" px="6x" py="4x">
          <Button color="secondary" onClick={handleClickChange}>
            {t('Password reset')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
