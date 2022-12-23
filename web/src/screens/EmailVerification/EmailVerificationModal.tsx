import { FC, useCallback, useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { CODE_LENGTH, isValidCode } from 'web/src/helpers/codeValidation';
import { useConfirmCode } from 'web/src/hooks/data/useFetchUsers';
import { captchaType } from 'web/src/api/config';
import { Captcha } from 'web/src/components';
import {
  emailVerificationFetch,
  resetCaptchaState,
  selectCaptchaResponse,
  selectMobileDeviceState,
  selectRecaptchaSuccess,
  selectSendEmailVerificationError,
  selectSendEmailVerificationLoading,
  selectSendEmailVerificationSuccess,
  selectUserInfo,
} from 'web/src/modules';
import { UserAdsAlert } from 'web/src/components/shared/UserAds/UserAdsAlert';

const EMAIL_SENT_TIMEOUT = 10000;

export const EmailVerificationModal: FC = () => {
  const [show, setShow] = useState(true);
  const [invalidCode, setInvalidCode] = useState(false);
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'resend' | 'captcha' | 'sent'>('resend');

  const t = useT();
  const dispatch = useDispatch();

  const resendInProgress = useSelector(selectSendEmailVerificationLoading);
  const resendError = useSelector(selectSendEmailVerificationError);
  const resendSuccess = useSelector(selectSendEmailVerificationSuccess);
  const captchaResponse = useSelector(selectCaptchaResponse);
  const reCaptchaSuccess = useSelector(selectRecaptchaSuccess);
  const user = useSelector(selectUserInfo);
  const isMobileDevice = useSelector(selectMobileDeviceState);

  const isCaptchaEnabled = captchaType() === 'recaptcha' || captchaType() === 'geetest';

  const confirmCode = useConfirmCode();
  const generateCode = useCallback(() => {
    if (!user?.email) {
      Bugsnag.notify('Email empty in EmailVerificationModal', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.context = 'screens/EmailVerificationModal';
        event.addMetadata('args', { user, email: user?.email });
      });
    }

    setStep('sent');
    dispatch(
      emailVerificationFetch({
        email: user.email,
        ...(isCaptchaEnabled && {
          captcha_response: captchaResponse,
        }),
      }),
    );
    dispatch(resetCaptchaState());
  }, [captchaResponse, dispatch, isCaptchaEnabled, user]);

  useEffect(() => {
    if (reCaptchaSuccess) {
      generateCode();
    }
  }, [generateCode, reCaptchaSuccess]);

  useEffect(() => {
    if (resendSuccess) {
      const h = window.setTimeout(() => setStep('resend'), EMAIL_SENT_TIMEOUT);
      return () => window.clearTimeout(h);
    }
    return undefined;
  }, [resendSuccess]);

  if (!show) {
    const handleClick = () => {
      setShow(true);
    };

    return (
      <Box px="5x" py="1x">
        <UserAdsAlert theme="warning">
          {t('Confirm your email')}!{' '}
          <Box
            as="button"
            type="button"
            fontWeight="strong"
            color={{ default: 'advertsAlertInfoLink', hover: 'advertsAlertInfoLinkHover' }}
            textDecoration="underline"
            onClick={handleClick}
          >
            {t('Confirm')}
          </Box>
        </UserAdsAlert>
      </Box>
    );
  }

  const handleResend = () => {
    if (isCaptchaEnabled) {
      setStep('captcha');
    } else {
      generateCode();
    }
  };

  const handleConfirm = async () => {
    const isValid = await confirmCode({ pin_code: code });
    if (isValid) {
      setShow(false);
    } else {
      setInvalidCode(true);
    }
  };

  const handleChangeCode = (v: string) => {
    setCode(v.length > CODE_LENGTH ? v.slice(0, CODE_LENGTH) : v);
    setInvalidCode(false);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleConfirm();
    }
  };

  const disableConfirm = !isValidCode(code);
  const disableResend = resendInProgress;

  const infoEl = t('verification.email.code', { email: <b>{user.email}</b> });

  const codeEl = (
    <Box display="flex" flexDirection="column" gap="1x">
      <Text color="danger" variant="caption">
        {invalidCode ? t('Invalid code') : <span>&nbsp;</span>}
      </Text>
      <NumberInput
        placeholder={t('Confirmation code')}
        value={code}
        onChange={handleChangeCode}
        onKeyPress={handleEnterPress}
        maxLength={CODE_LENGTH}
        color={invalidCode ? 'failed' : undefined}
        autoFocus
      />
    </Box>
  );

  const confirmEl = (
    <Button
      data-gtm-click="verify_email"
      color="secondary"
      onClick={handleConfirm}
      disabled={disableConfirm}
    >
      {t('Confirm')}
    </Button>
  );

  const resendEl =
    step === 'sent' ? (
      <Box height="11x" display="flex" alignItems="center" justifyContent="center">
        <Text textAlign="center" color="success">
          {t('The email has been sent')}
        </Text>
      </Box>
    ) : (
      <Button
        color={isMobileDevice ? 'primary' : 'clarified'}
        variant="text"
        onClick={handleResend}
        disabled={disableResend}
      >
        {t('Resend email')}
      </Button>
    );

  const captchaEl = step === 'captcha' && <Captcha error={resendError} success={resendSuccess} />;

  return (
    <Modal show size="lg" onClose={() => setShow(false)}>
      <ModalHeader center={!isMobileDevice}>{t('Confirm your email')}</ModalHeader>
      {isMobileDevice ? (
        <Box px="7x" pt="2x" pb="7x" display="flex" flexDirection="column" gap="4x">
          <Box>
            <Text>{infoEl}</Text>
            <Box mt="8x">{codeEl}</Box>
          </Box>
          {confirmEl}
          {resendEl}
          {captchaEl}
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" px="8x" pb="6x">
          <Text textAlign="center">{infoEl}</Text>
          <Box mt="4x" alignSelf="stretch">
            {codeEl}
          </Box>
          <Box mt="5x">{confirmEl}</Box>
          <Box mt="8x" display="flex" flexDirection="column" gap="4x">
            <Text textAlign="center">
              {t('verification.email.resend', { email: <strong>{user.email}</strong> })}
            </Text>
            {resendEl}
            {captchaEl}
          </Box>
        </Box>
      )}
    </Modal>
  );
};
