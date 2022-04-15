import { FC, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Stack } from 'web/src/components/ui/Stack';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { useCountdown } from 'web/src/hooks/useCountdown';
import { EMAIL_RESEND_TIMEOUT } from 'web/src/helpers/codeValidation';
import { formatSeconds } from 'web/src/helpers/formatSeconds';

interface Props {
  email?: string | undefined;
  show: boolean;
  onResend: () => void;
  onClose: () => void;
}

export const P2PCreateApiKeyConfirmModal: FC<Props> = ({ email, show, onResend, onClose }) => {
  const t = useT();
  const { start, reset, countdown } = useCountdown();

  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show, reset]);

  const handleResend = () => {
    start(EMAIL_RESEND_TIMEOUT);

    onResend();
  };

  return (
    <Modal size="lg" show={show} onClose={onClose}>
      <ModalHeader>{t('Confirmation')}</ModalHeader>
      <ModalBody>
        <Stack direction="column" marginBottom="3x">
          <span>{t('gift.confirmation_email', { email })}</span>
          <span>{t('gift.check_spam')}</span>
        </Stack>
      </ModalBody>

      <Box display="flex" justifyContent="center" py="4x">
        <Button color="primary" variant="outlined" disabled={countdown > 0} onClick={handleResend}>
          {countdown > 0 ? formatSeconds(countdown) : t('Send an email again')}
        </Button>
      </Box>
    </Modal>
  );
};
