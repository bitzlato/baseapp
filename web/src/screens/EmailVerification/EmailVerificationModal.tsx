import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'web/src/components/Box/Box';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { captchaType } from '../../api/config';
import { Captcha } from '../../components';
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

  const t = useT();
  const dispatch = useDispatch();

  const emailVerificationLoading = useSelector(selectSendEmailVerificationLoading);
  const error = useSelector(selectSendEmailVerificationError);
  const success = useSelector(selectSendEmailVerificationSuccess);
  const captchaResponse = useSelector(selectCaptchaResponse);
  const reCaptchaSuccess = useSelector(selectRecaptchaSuccess);
  const geetestCaptchaSuccess = useSelector(selectGeetestCaptchaSuccess);
  const user = useSelector(selectUserInfo);

  if (!show) {
    return null;
  }

  const handleClick = () => {
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

  const disableButton =
    emailVerificationLoading ||
    (captchaType() === 'recaptcha' && !reCaptchaSuccess) ||
    (captchaType() === 'geetest' && !geetestCaptchaSuccess);

  return (
    <Modal show onClose={() => setShow(false)}>
      <ModalHeader>{t('page.header.signUp.modal.header')}</ModalHeader>
      <ModalBody>
        <Box col spacing="3">
          <span>{t('page.header.signUp.modal.body2', { email: <b>{user.email}</b> })}</span>
          <Captcha error={error} success={success} />
        </Box>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClick} disabled={disableButton}>
          {t('page.resendConfirmation')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
