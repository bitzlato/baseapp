import { useState, KeyboardEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { TextInput } from 'web/src/components/Input/TextInput';
import { Captcha } from 'web/src/components/Captcha';
import { Box } from 'web/src/components/Box/Box';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { useDocumentTitle, useShallowSelector } from 'web/src/hooks';
import {
  selectRecaptchaSuccess,
  selectGeetestCaptchaSuccess,
  selectCaptchaResponse,
  resetCaptchaState,
  forgotPassword,
  selectForgotPasswordSuccess,
  selectForgotPasswordError,
} from 'web/src/modules';
import { EMAIL_REGEX, ERROR_INVALID_EMAIL } from 'web/src/helpers';
import { captchaType, captchaLogin } from 'web/src/api';
import { CloseIcon } from 'web/src/assets/images/CloseIcon';
import { IconButton } from 'web/src/components/IconButton/IconButton';

export const ForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory<{ email?: string }>();
  const t = useT();

  const [email, setEmail] = useState(history.location.state.email ?? '');
  const [emailError, setEmailError] = useState('');

  const success = useSelector(selectForgotPasswordSuccess);
  const error = useSelector(selectForgotPasswordError);
  const reCaptchaSuccess = useSelector(selectRecaptchaSuccess);
  const geetestCaptchaSuccess = useSelector(selectGeetestCaptchaSuccess);
  const captchaResponse = useShallowSelector(selectCaptchaResponse);

  useDocumentTitle('Forgot password');

  const validateForm = () => {
    const isEmailValid = email ? email.match(EMAIL_REGEX) : true;
    if (!isEmailValid) {
      setEmailError(ERROR_INVALID_EMAIL);
    }
  };

  const isValidForm = () => {
    const isEmailValid = email.match(EMAIL_REGEX);
    return email && isEmailValid;
  };

  const isButtonDisabled = () => {
    if (!email.match(EMAIL_REGEX)) {
      return true;
    }
    if (captchaType() === 'recaptcha' && !reCaptchaSuccess) {
      return true;
    }
    if (captchaType() === 'geetest' && !geetestCaptchaSuccess) {
      return true;
    }
    return false;
  };

  const handleSubmitForm = () => {
    switch (captchaType()) {
      case 'recaptcha':
      case 'geetest':
        dispatch(forgotPassword({ email, captcha_response: captchaResponse }));
        break;
      default:
        dispatch(forgotPassword({ email }));
        break;
    }

    setEmail('');
    dispatch(resetCaptchaState());
  };

  const handleClick = (e?: MouseEvent) => {
    e?.preventDefault();
    if (isValidForm()) {
      handleSubmitForm();
    } else {
      validateForm();
    }
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleClick();
    }
  };

  const handleGoBack = () => {
    history.push('/signin');
  };

  return (
    <form>
      <Box padding="3" col spacing="3" onKeyPress={handleEnterPress}>
        <Box row spacing="2" justify="between">
          <Box as="h4" textColor="primary" margin="0">
            {t('page.forgotPassword')}
          </Box>
          <IconButton onClick={handleGoBack}>
            <CloseIcon />
          </IconButton>
        </Box>
        <span>{t('page.forgotPassword.message')}</span>
        <TextInput
          type="email"
          label={t('page.forgotPassword.email')}
          labelVisible
          onChange={setEmail}
          value={email}
          autoFocus
          error={emailError}
        />
        {captchaLogin() && <Captcha error={error} success={success} />}
        <Button disabled={isButtonDisabled()} onClick={handleClick}>
          {t('page.forgotPassword.send')}
        </Button>
      </Box>
    </form>
  );
};
