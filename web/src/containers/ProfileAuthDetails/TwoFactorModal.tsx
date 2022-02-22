import { FC, useState, KeyboardEvent } from 'react';
import { Box } from 'web/src/components/Box/Box';
import { Button } from 'web/src/components/ui/Button';
import { TextInput } from 'web/src/components/Input/TextInput';
import { useT } from 'web/src/hooks/useT';
import { Modal2 } from 'web/src/components/Modal/Modal2';
import { formatSeconds } from 'web/src/helpers/formatSeconds';
import { useCountdown } from 'web/src/hooks/useCountdown';

interface Props {
  onClose: () => void;
  onSend: (code: string) => void;
}

export const TwoFactorModal2: FC<Props> = ({ onClose, onSend }) => {
  const [code, setCode] = useState('');
  const t = useT();
  const { start, countdown } = useCountdown();

  const disabled = !code.match('^[0-9]{6}$') || countdown > 0;

  const handleSend = () => {
    if (!disabled) {
      onSend(code);
      start(5);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Modal2 header={t('2FA Verification')} onClose={onClose}>
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
          {countdown > 0 ? formatSeconds(countdown) : t('Send')}
        </Button>
      </Box>
    </Modal2>
  );
};
