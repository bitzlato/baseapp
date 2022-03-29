import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useT } from 'web/src/hooks/useT';
import { toggle2faFetch } from 'web/src/modules/user/profile/actions';
import { Text } from 'web/src/components/ui/Text';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { SwitchField } from './SwitchField';

interface Props {
  value: boolean;
}

export const TwoFactorAuthSwitcher: FC<Props> = ({ value }) => {
  const t = useT();
  const dispatch = useDispatch();
  const history = useHistory();
  const [show2fa, setShow2fa] = useState(false);
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    if (!user.otp) {
      setShow2fa(false);
    }
  }, [user.otp]);

  const handleChange = (enable2fa: boolean) => {
    if (enable2fa) {
      history.push('/profile/2fa');
      window.scroll({ top: 0 });
    } else {
      setShow2fa(true);
    }
  };

  const handleClose = () => {
    setShow2fa(false);
  };

  const handleSend = (code: string) => {
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
      {show2fa && (
        <TwoFactorModal
          buttonText={t('page.body.profile.header.account.content.twoFactorAuthentication.disable')}
          onClose={handleClose}
          onSend={handleSend}
        />
      )}
    </>
  );
};
