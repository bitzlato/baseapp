import { FC, useState } from 'react';
import { UserAdvertDetails } from 'web/src/modules/p2p/types';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { Spinner } from 'web/src/components/ui/Spinner';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import { useDeleteUserAd } from 'web/src/hooks/mutations/useDeleteUserAd';
import TrashIcon from 'web/src/assets/svg/TrashIcon2.svg';

interface Props {
  adId: UserAdvertDetails['id'];
}

export const UserAdDeletingButton: FC<Props> = ({ adId }) => {
  const { t, history } = useAdapterContext<{ advertId: string }>();
  const { lang } = useAppContext();
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deleteUserAd, { status: deleteUserAdState }] = useDeleteUserAd(lang);

  const handleDelete = () => {
    setShowDeletePrompt(true);
  };

  const handleDeleteSubmit = async () => {
    await deleteUserAd({ id: adId });
    history.push('/p2p/adverts/');
  };

  return (
    <>
      <Box
        as="button"
        type="button"
        display="flex"
        alignItems="center"
        gap="2x"
        py="1x"
        color={{
          default: 'textMuted',
          hover: 'textHighlighted',
        }}
        fontSize="caption"
        onClick={handleDelete}
      >
        <TrashIcon />
        <span>{t('Delete')}</span>
      </Box>

      <Modal size="md" show={showDeletePrompt} onClose={() => setShowDeletePrompt(false)}>
        <ModalHeader center>{t('userAd.deleteTitle')}</ModalHeader>
        <ModalBody>
          <Box pt="2x" pb="6x">
            <Text textAlign="center">{t('userAd.deleteNotice', { id: adId })}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Box display="flex" alignItems="center" gap="4x" width="full">
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => setShowDeletePrompt(false)}
            >
              {t('Back')}
            </Button>
            <Button color="secondary" fullWidth onClick={handleDeleteSubmit}>
              {deleteUserAdState === 'running' ? <Spinner size="5x" /> : t('Delete')}
            </Button>
          </Box>
        </ModalFooter>
      </Modal>
    </>
  );
};
