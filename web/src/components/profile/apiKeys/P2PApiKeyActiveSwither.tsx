import { FC, useState } from 'react';
import { useP2PUpdateApiKey } from 'web/src/hooks/mutations/useP2PUpdateApiKey';
import { Switch } from 'web/src/components/form/Switch';
import { useSelector } from 'react-redux';
import { selectOtpEnabled } from 'web/src/modules/user/profile/selectors';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import { useT } from 'web/src/hooks/useT';
import { P2PApiKey } from 'web/src/modules/user/apiKeys/types';

interface Props {
  apiKey: P2PApiKey;
}

export const P2PApiKeyActiveSwither: FC<Props> = ({ apiKey }) => {
  const t = useT();
  const otp = useSelector(selectOtpEnabled);
  const [show2fa, setShow2fa] = useState(false);

  const handleClose = () => setShow2fa(false);
  const [updateApiKey] = useP2PUpdateApiKey({ onSuccess: handleClose });

  const handleChange = () => setShow2fa(true);
  const handleSend = (twoFACode: string) =>
    updateApiKey({
      params: {
        ...apiKey,
        active: !apiKey.active,
      },
      twoFACode,
    });

  return (
    <>
      <Switch checked={apiKey.active} disabled={!otp} onChange={handleChange} />
      {show2fa ? (
        <TwoFactorModal
          onClose={handleClose}
          onSend={handleSend}
          buttonText={apiKey.active ? t('Disable') : t('Enable')}
        />
      ) : null}
    </>
  );
};
