import { FC, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { useHistory } from 'react-router-dom';

interface Props {
  show: boolean;
  onSend: () => Promise<void>;
  onClose: () => void;
}

export const ProposalToEnableOTP: FC<Props> = ({ show = false, onSend, onClose }) => {
  const t = useT();
  const history = useHistory();
  const [isWaiting, setWaiting] = useState(false);

  const handleSend = async () => {
    setWaiting(true);

    await onSend();

    setWaiting(false);
  };
  const handleClickAprove = () => {
    onClose();
    history.push('/profile/2fa');
    window.scroll({ top: 0 });
  };

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>{t('page.body.profile.apiKeys.modal.note')}</ModalHeader>
      <ModalBody loading={isWaiting}>{t('proposal_otp.body', { br: <br /> })}</ModalBody>
      {!isWaiting && (
        <Box display="flex" flexDirection="column" px="6x" pt="4x" pb="6x">
          <Button color="secondary" fullWidth onClick={handleClickAprove}>
            {t('proposal_otp.yes')}
          </Button>
          <Box h="4x" />
          <Button color="secondary" variant="outlined" fullWidth onClick={handleSend}>
            {t('proposal_otp.no')}
          </Button>
        </Box>
      )}
    </Modal>
  );
};
