import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'web/src/components/Box/Box';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { NumberInput } from 'web/src/components/Input/NumberInput';
import { CODE_LENGTH, isValidCode } from 'web/src/helpers/codeValidation';
import { useConfirmCode } from 'web/src/hooks/data/useFetchUsers';
import { captchaType } from 'web/src/api/config';
import { Captcha } from 'web/src/components';
import {
  emailVerificationFetch,
  resetCaptchaState,
  selectCaptchaResponse,
  selectGeetestCaptchaSuccess,
  selectRecaptchaSuccess,
  selectSendEmailVerificationError,
  selectSendEmailVerificationLoading,
  selectSendEmailVerificationSuccess,
  selectUserInfo,
} from '../../modules';

export const EmailVerificationModal: FC = () => {
  const [show, setShow] = useState(true);
  const [code, setCode] = useState('');

  const t = useT();
  const dispatch = useDispatch();

  const emailVerificationLoading = useSelector(selectSendEmailVerificationLoading);
  const error = useSelector(selectSendEmailVerificationError);
  const success = useSelector(selectSendEmailVerificationSuccess);
  const captchaResponse = useSelector(selectCaptchaResponse);
  const reCaptchaSuccess = useSelector(selectRecaptchaSuccess);
  const geetestCaptchaSuccess = useSelector(selectGeetestCaptchaSuccess);
  const user = useSelector(selectUserInfo);

  const confirmCode = useConfirmCode();

  if (!show) {
    return null;
  }

  const handleResend = () => {
    dispatch(
      emailVerificationFetch({
        email: user.email,
        ...((captchaType() === 'recaptcha' || captchaType() === 'geetest') && {
          captcha_response: captchaResponse,
        }),
      }),
    );

    dispatch(resetCaptchaState());
  };

  const handleConfirm = async () => {
    if (await confirmCode({ pin_code: code })) {
      setShow(false);
    }
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleConfirm();
    }
  };

  const disableConfirm = !isValidCode(code);

  const disableResend =
    emailVerificationLoading ||
    (captchaType() === 'recaptcha' && !reCaptchaSuccess) ||
    (captchaType() === 'geetest' && !geetestCaptchaSuccess);

  return (
    <Modal show size="lg" onClose={() => setShow(false)}>
      <ModalHeader>{t('page.header.signUp.modal.header')}</ModalHeader>
      <ModalBody>
        <Box col spacing="3">
          <span>{t('page.header.signUp.modal.body2', { email: <b>{user.email}</b> })}</span>
          <Captcha error={error} success={success} />
          <NumberInput
            label={t('Email verification code')}
            value={code}
            onChange={setCode}
            onKeyPress={handleEnterPress}
            maxLength={CODE_LENGTH}
            autoFocus
          />
        </Box>
      </ModalBody>
      <ModalFooter>
        <Box grow row spacing="3">
          <Button
            color="secondary"
            variant="outlined"
            fullWidth
            onClick={handleResend}
            disabled={disableResend}
          >
            {t('Resend code')}
          </Button>
          <Button color="primary" fullWidth onClick={handleConfirm} disabled={disableConfirm}>
            {t('Confirm')}
          </Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};
