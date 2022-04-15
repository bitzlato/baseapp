import { FC, useState, KeyboardEvent, ReactNode } from 'react';
import { Box } from 'web/src/components/Box/Box';
import { Button } from 'web/src/components/ui/Button';
import { TextInput } from 'web/src/components/Input/TextInput';
import { useT } from 'web/src/hooks/useT';
import { formatSeconds } from 'web/src/helpers/formatSeconds';
import { useCountdown } from 'web/src/hooks/useCountdown';
import { isValidCode, OTP_TIMEOUT } from 'web/src/helpers/codeValidation';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { AutoFocusInside } from 'react-focus-on';

interface Props {
  buttonText?: string | undefined;
  text?: ReactNode | undefined;
  show?: boolean | undefined;
  onSend: (code: string) => void;
  onClose: () => void;
}

export const TwoFactorModal: FC<Props> = ({ buttonText, text, show = true, onSend, onClose }) => {
  const [code, setCode] = useState('');
  const t = useT();
  const { start, countdown } = useCountdown();

  const disabled = !isValidCode(code) || countdown > 0;

  const handleSend = () => {
    if (!disabled) {
      start(OTP_TIMEOUT);
      onSend(code);
      setCode('');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>{t('2FA Verification')}</ModalHeader>
      <ModalBody>
        <Box col spacing="3">
          {text}
          <AutoFocusInside>
            <TextInput
              label={t('2FA code')}
              placeholder={!text ? t('Enter 2FA code from the app') : undefined}
              value={code}
              onChange={setCode}
              onKeyPress={handleKeyPress}
              maxLength={6}
            />
          </AutoFocusInside>
        </Box>
      </ModalBody>
      <ModalFooter>
        <Button fullWidth disabled={disabled} onClick={handleSend}>
          {countdown > 0 ? formatSeconds(countdown) : buttonText ?? t('Send')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
