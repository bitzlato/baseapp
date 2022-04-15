import { FC, useState } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { useUpdateProfile } from 'web/src/hooks/mutations/useUpdateProfile';
import EditIcon from 'web/src/assets/svg/EditIcon.svg';
import { useCheckPublicName } from 'web/src/hooks/useСheckPublicName';
import { useDebouncedCallback } from 'use-debounce';
import { TextInput } from 'web/src/components/Input/TextInput';

export const ChangePublicName: FC = () => {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [publicName, setPublicName] = useState<string>();
  const [valid, setValid] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateProfile = useUpdateProfile();
  const [mutate, data] = useCheckPublicName();

  const checkPublicName = useDebouncedCallback((value) => {
    mutate(value);
  }, 300);

  const handleInputChange = (value: string) => {
    const alphanumeric = /^[a-zA-Z0-9_]*$/;
    const isValid = value.length > 0 && value.length <= 15 && alphanumeric.test(value);

    if (isValid) {
      checkPublicName({ publicName: value });
    }

    setValid(isValid);
    setPublicName(value);
  };

  const handleChangeName = () => {
    setOpen(false);
    if (publicName) {
      updateProfile({
        publicName,
      });
    }
  };

  const disaledChange = data?.status !== 'success' || !valid;
  let errorMessage = '';

  if (publicName) {
    if (publicName?.length > 15) {
      errorMessage = t('Public Name length error');
    } else if (!valid) {
      errorMessage = t('Public name format error');
    } else if (data?.status === 'failure') {
      errorMessage = t('Public name check error');
    }
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <EditIcon />
      </IconButton>
      <Modal size="lg" show={open} onClose={handleClose}>
        <ModalHeader>{t('Public name title')}</ModalHeader>
        <Box
          fontSize="medium"
          mx="6x"
          py="4x"
          borderTopWidth="1x"
          borderColor="modalHeaderBorderBottom"
          borderTopStyle="solid"
        >
          <Box display="flex" alignItems="center" mb="4x">
            {t('Public name irreversable')}
          </Box>
          <Box
            fontSize="caption"
            display="flex"
            pb="2x"
            as={TextInput}
            label={t('Public name')}
            value={publicName}
            onChange={handleInputChange}
            error={errorMessage && <span>{errorMessage}</span>}
          />
          <small>{t('Public name help')}</small>
        </Box>
        <Box display="flex" alignItems="center" px="6x" py="4x">
          <Button color="secondary" disabled={disaledChange} fullWidth onClick={handleChangeName}>
            {t('Change')}
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
