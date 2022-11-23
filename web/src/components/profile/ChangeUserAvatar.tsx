import { FC, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'web/src/components/ui/Button';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { useSaveAvatar } from 'web/src/hooks/mutations/useSaveAvatar';
import { useT } from 'web/src/hooks/useT';
import { FetchError } from 'web/src/helpers/fetch';
import { alertPush } from 'web/src/modules';
import { UserAvatar } from './UserAvatar';
import * as s from './ChangeUserAvatar.css';

const MAX_FILE_SIZE_MB = 1;

interface ChangeUserAvatarProps {
  image?: string;
}

export const ChangeUserAvatar: FC<ChangeUserAvatarProps> = ({ image }) => {
  const t = useT();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [imageFile, setImageFile] = useState<File>();
  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mutate, data] = useSaveAvatar();

  const handleClickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target && target.files && target.files[0]) {
      const fileName = target.files[0].name;
      const idxDot = fileName.lastIndexOf('.') + 1;
      const extFile = fileName.slice(idxDot).toLowerCase();
      const acceptableExtensions = ['jpg', 'jpeg', 'png'];

      if (acceptableExtensions.includes(extFile)) {
        setImageFile(target?.files[0]);
        setErrorMessage('');
      } else {
        setErrorMessage(t('page_profile.modal.format_error'));
      }
    }
  };

  const handleClickSetAvatar = async () => {
    try {
      if (imageFile) {
        await mutate(imageFile);
        setOpen(false);
      }
    } catch (error) {
      if (error instanceof FetchError) {
        if (error.code === 413) {
          dispatch(
            alertPush({
              type: 'error',
              message: [t('maxFileSizeError', { value: MAX_FILE_SIZE_MB })],
            }),
          );
        }
      }
    }
  };

  const imageFileSrc = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : ''),
    [imageFile],
  );

  const imageSrc = imageFileSrc || image || '';

  return (
    <>
      <Button color="secondary" onClick={handleClick}>
        {t('page_profile.button.set_avatar')}
      </Button>
      <Modal size="lg" show={open} onClose={handleClose}>
        <ModalHeader>{t('page_profile.modal.title')}</ModalHeader>
        <Box
          display="flex"
          fontSize="medium"
          mx="6x"
          py="4x"
          borderTopWidth="1x"
          borderColor="modalHeaderBorderBottom"
          borderTopStyle="solid"
          flexDirection="row"
        >
          <UserAvatar image={imageSrc} isLoading={data.status === 'running'} />
          <Box display="flex" flexDirection="column" ml="6x" flexGrow={1}>
            {t('page_profile.modal.info')}
            {errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" px="6x" py="4x">
          {imageFile ? (
            <Button
              color="secondary"
              fullWidth
              disabled={data.status === 'running'}
              onClick={handleClickSetAvatar}
            >
              {t('page_profile.button.upload_avatar')}
            </Button>
          ) : (
            <Box display="flex" width="full" />
          )}
          <Box w="4x" flexShrink={0} />
          <Button
            color="secondary"
            variant="outlined"
            fullWidth
            disabled={data.status === 'running'}
          >
            <Box
              display="flex"
              htmlFor="avatarInput"
              alignItems="center"
              justifyContent="center"
              w="full"
              as="label"
            >
              <input
                id="avatarInput"
                accept="image/png, image/jpeg, image/jpg"
                type="file"
                style={{ display: 'none' }}
                disabled={data.status === 'running'}
                onChange={handleClickChange}
              />

              {t('page_profile.button.select_avatar')}
            </Box>
          </Button>
        </Box>
      </Modal>
    </>
  );
};
