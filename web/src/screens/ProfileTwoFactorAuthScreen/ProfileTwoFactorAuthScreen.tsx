import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box } from 'web/src/components/Box/Box';
import { Button } from 'web/src/components/ui/Button';
import { Card } from 'web/src/components/Card/Card';
import { Container } from 'web/src/components/Container/Container';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { isValidCode, OTP_TIMEOUT } from 'web/src/helpers/codeValidation';
import { formatSeconds } from 'web/src/helpers/formatSeconds';
import { useCountdown } from 'web/src/hooks/useCountdown';
import { useDocumentTitle } from 'web/src/hooks/useDocumentTitle';
import { useT } from 'web/src/hooks/useT';
import { CopyableTextField } from 'web/src/components/CopyableTextField';
import { CloseIcon } from '../../assets/images/CloseIcon';
import { copy } from '../../helpers';
import { alertPush, selectMobileDeviceState } from '../../modules';
import {
  generate2faQRFetch,
  selectTwoFactorAuthBarcode,
  selectTwoFactorAuthQR,
  selectTwoFactorAuthSuccess,
  selectUserInfo,
  toggle2faFetch,
  toggle2faSuccess,
} from '../../modules/user/profile';

import s from './ProfileTwoFactorAuthScreen.postcss';

export const ProfileTwoFactorAuthScreen: FC = () => {
  const [code, setCode] = useState('');

  useDocumentTitle('Two factor authentication');

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(selectUserInfo);
  const barcode = useSelector(selectTwoFactorAuthBarcode);
  const qrUrl = useSelector(selectTwoFactorAuthQR);
  const success = useSelector(selectTwoFactorAuthSuccess) ?? false;
  const isMobileDevice = useSelector(selectMobileDeviceState);

  const t = useT();

  const { start, countdown } = useCountdown();

  useEffect(() => {
    if (success) {
      dispatch(toggle2faSuccess());
      history.push('/profile');
    } else if (!user.otp) {
      dispatch(generate2faQRFetch());
    }
  }, [success, user.otp, dispatch, history]);

  const doCopy = () => {
    copy('referral-id');
    dispatch(
      alertPush({
        message: ['page.body.wallets.tabs.deposit.ccy.message.success'],
        type: 'success',
      }),
    );
  };

  const disabled = user.otp || !isValidCode(code) || countdown > 0;

  const handleEnable2fa = () => {
    if (!disabled) {
      start(OTP_TIMEOUT);
      dispatch(toggle2faFetch({ code, enable: true }));
      setCode('');
    }
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleEnable2fa();
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const secret = qrUrl.match(/secret=(\w+)/)?.[1] ?? '';

  const content = (
    <>
      <Box as="ol" spacing="3" className={s.twoFaSteps}>
        <li>
          <span>
            {t('page.body.profile.header.account.content.twoFactorAuthentication.message.1')}
          </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://apps.apple.com/app/google-authenticator/id388497605?mt=8"
          >
            AppStore
          </a>
          <span>
            {' '}
            {t('page.body.profile.header.account.content.twoFactorAuthentication.message.or')}
          </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl"
          >
            Google play
          </a>
        </li>
        <li>
          <Box col spacing="2">
            <span>
              {t('page.body.profile.header.account.content.twoFactorAuthentication.message.2')}
            </span>
            <Box
              self="center"
              className={s.twoFaQr}
              as="img"
              alt=""
              src={`data:image/png;base64,${barcode}`}
            />
            <CopyableTextField
              fieldId="secret-2fa"
              label={t(
                'page.body.profile.header.account.content.twoFactorAuthentication.message.mfa',
              )}
              value={secret}
              onCopy={doCopy}
            />
            <span>
              {t('page.body.profile.header.account.content.twoFactorAuthentication.message.3')}
            </span>
          </Box>
        </li>
        <li>
          <Box col spacing="2">
            <span>
              {t('page.body.profile.header.account.content.twoFactorAuthentication.message.4')}
            </span>
            <NumberInput
              label={t('2FA code')}
              value={code}
              onChange={setCode}
              onKeyPress={handleEnterPress}
              autoFocus
            />
          </Box>
        </li>
      </Box>
      <Button onClick={handleEnable2fa} color="primary" disabled={disabled}>
        {countdown > 0
          ? formatSeconds(countdown)
          : t('page.body.profile.header.account.content.twoFactorAuthentication.enable')}
      </Button>
    </>
  );

  return isMobileDevice ? (
    content
  ) : (
    <Container maxWidth="md" my="6x">
      <Card
        header={
          <Box row justify="between">
            <h4>{t('page.body.profile.header.account.content.twoFactorAuthentication.header')}</h4>
            <IconButton onClick={goBack}>
              <CloseIcon />
            </IconButton>
          </Box>
        }
      >
        {content}
      </Card>
    </Container>
  );
};
