import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useT } from 'web/src/hooks/useT';
import { toggle2faFetch } from 'web/src/modules/user/profile/actions';
import { Text } from 'web/src/components/ui/Text';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import { SwitchField } from './SwitchField';

interface Props {
  value: boolean;
}

export const TwoFactorAuthSwitcher: FC<Props> = ({ value }) => {
  const t = useT();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showDisableModal, setShowDisableModal] = useState(false);

  const handleChange = (enable2fa: boolean) => {
    if (enable2fa) {
      history.push('/profile/2fa');
      window.scroll({ top: 0 });
    } else {
      setShowDisableModal(true);
    }
  };

  const handleCloseDisableModal = () => {
    setShowDisableModal(false);
  };

  const handleSendDisableModal = (code: string) => {
    dispatch(toggle2faFetch({ code, enable: false }));
  };

  return (
    <>
      <SwitchField
        id="2fa"
        label={t('page.body.profile.header.account.content.twoFactorAuthentication')}
        helpText={
          <Text variant="label" color={value ? 'success' : 'danger'} fontWeight="strong">
            {value
              ? t('page.body.profile.header.account.content.twoFactorAuthentication.message.enable')
              : t(
                  'page.body.profile.header.account.content.twoFactorAuthentication.message.disable',
                )}
          </Text>
        }
        value={value}
        onChange={handleChange}
      />
      {showDisableModal && (
        <TwoFactorModal
          buttonText={t('page.body.profile.header.account.content.twoFactorAuthentication.disable')}
          onClose={handleCloseDisableModal}
          onSend={handleSendDisableModal}
        />
      )}
    </>
  );
};
