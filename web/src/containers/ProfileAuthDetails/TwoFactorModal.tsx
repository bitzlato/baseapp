import { FC, useState, KeyboardEvent } from 'react';
import { Box } from 'web/src/components/Box/Box';
import { Button } from 'web/src/components/ui/Button';
import { TextInput } from 'web/src/components/Input/TextInput';
import { useT } from 'web/src/hooks/useT';
import { Modal2 } from 'web/src/components/Modal/Modal2';
import { formatSeconds } from 'web/src/helpers/formatSeconds';
import { useCountdown } from 'web/src/hooks/useCountdown';
import { isValidCode, OTP_TIMEOUT } from 'web/src/helpers/codeValidation';

interface Props {
  onClose: () => void;
  onSend: (code: string) => void;
  buttonText?: string | undefined;
}

export const TwoFactorModal: FC<Props> = ({ onClose, onSend, buttonText }) => {
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
    <Modal2 header={t('2FA Verification')} onClose={onClose} show>
      <Box col spacing="3">
        <TextInput
          label={t('2FA code')}
          placeholder={t('Enter 2FA code from the app')}
          value={code}
          onChange={setCode}
          onKeyPress={handleKeyPress}
          autoFocus
        />
        <Button disabled={disabled} onClick={handleSend}>
          {countdown > 0 ? formatSeconds(countdown) : buttonText ?? t('Send')}
        </Button>
      </Box>
    </Modal2>
  );
};
