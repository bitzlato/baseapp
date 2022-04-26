import { FC, FormEvent, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { P2PApiKey } from 'web/src/modules/user/apiKeys/types';
import { TextInput } from 'web/src/components/Input/TextInput';
import { useP2PUpdateApiKey } from 'web/src/hooks/mutations/useP2PUpdateApiKey';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import EditIcon from 'web/src/assets/svg/EditIcon.svg';
import { AutoFocusInside } from 'react-focus-on';
import { useSelector } from 'react-redux';
import { selectOtpEnabled } from 'web/src/modules/user/profile/selectors';

interface RenameFormProps {
  apiKey: P2PApiKey;
  onSubmit: (apiKey: P2PApiKey) => void;
  onClose: () => void;
}

const RenameForm: FC<RenameFormProps> = ({ apiKey, onSubmit, onClose }) => {
  const t = useT();
  const [name, setName] = useState(apiKey.name);
  const [error, setError] = useState<string | undefined>();

  const handleChange = (value: string) => setName(value);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name) {
      setError(t('p2p.apiKeys.enter_key_name'));

      return;
    }

    onClose();
    onSubmit({
      ...apiKey,
      name,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ModalBody>
        <AutoFocusInside>
          <Box
            as={TextInput}
            fontSize="caption"
            display="flex"
            mb="2x"
            label={t('Key name')}
            value={name}
            error={error}
            onChange={handleChange}
          />
        </AutoFocusInside>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="secondary">
          {t('Change')}
        </Button>
        <Box w="2x" />
        <Button color="secondary" variant="outlined" onClick={onClose}>
          {t('Cancel')}
        </Button>
      </ModalFooter>
    </form>
  );
};

interface Props {
  apiKey: P2PApiKey;
}

export const P2PRenameApiKey: FC<Props> = ({ apiKey }) => {
  const t = useT();
  const otpEnabled = useSelector(selectOtpEnabled);
  const [step, setStep] = useState<'idle' | 'rename' | 'otp'>('idle');
  const [nextApiKey, setNextApiKey] = useState<P2PApiKey | undefined>();

  const handleClose = () => setStep('idle');
  const [updateApiKey] = useP2PUpdateApiKey({ onSuccess: handleClose });

  const handleClickRename = () => setStep('rename');

  const handleSubmit = (newApiKey: P2PApiKey) => {
    setNextApiKey(newApiKey);
    setStep('otp');
  };
  const handleSend = async (twoFACode: string) =>
    nextApiKey &&
    updateApiKey({
      params: nextApiKey,
      twoFACode,
    });

  return (
    <>
      <Button
        variant="text"
        color="clarified"
        size="small"
        disabled={!otpEnabled}
        onClick={handleClickRename}
      >
        <Box as="span" mr="2x">
          <EditIcon width="16" height="16" />
        </Box>
        {t('Rename')}
      </Button>
      <Modal show={step === 'rename'} onClose={handleClose}>
        <ModalHeader>{t('Rename')}</ModalHeader>
        <RenameForm apiKey={apiKey} onSubmit={handleSubmit} onClose={handleClose} />
      </Modal>
      <TwoFactorModal
        show={step === 'otp'}
        onClose={handleClose}
        onSend={handleSend}
        buttonText={t('Rename')}
      />
    </>
  );
};
