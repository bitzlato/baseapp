import { useEffect, useState, KeyboardEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getSearchParam, setLocation } from 'web/src/helpers/url';
import { TextInput } from 'web/src/components/Input/TextInput';
import { Captcha } from 'web/src/components/Captcha';
import { Box } from 'web/src/components/Box/Box';
import { isValidCode } from 'web/src/helpers/codeValidation';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Tab, TabList, Tabs } from 'web/src/components/Tabs';
import { useShallowSelector } from 'web/src/hooks';
import {
  selectSignInRequire2FA,
  selectUserFetching,
  selectUserLoggedIn,
  signIn,
  signInError,
  signUpRequireVerification,
  selectSignInError,
  selectRecaptchaSuccess,
  selectGeetestCaptchaSuccess,
  selectCaptchaResponse,
  resetCaptchaState,
  selectSignInLoading,
  selectVerifyEmail,
} from 'web/src/modules';
import {
  EMAIL_REGEX,
  ERROR_EMPTY_PASSWORD,
  ERROR_INVALID_EMAIL,
  setDocumentTitle,
} from 'web/src/helpers';
import { captchaType, captchaLogin } from 'web/src/api';
import { PasswordInput } from 'web/src/components/Input/PasswordInput';
import s from './SignIn.postcss';

export const SignIn: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const t = useT();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [code, setCode] = useState('');

  const isLoggedIn = useSelector(selectUserLoggedIn);
  const loading = useSelector(selectUserFetching);
  const require2FA = useSelector(selectSignInRequire2FA);
  const requireEmailVerification = useSelector(selectVerifyEmail);
  const errorSignIn = useShallowSelector(selectSignInError);
  const reCaptchaSuccess = useSelector(selectRecaptchaSuccess);
  const geetestCaptchaSuccess = useSelector(selectGeetestCaptchaSuccess);
  const captchaResponse = useShallowSelector(selectCaptchaResponse);
  const signInLoading = useSelector(selectSignInLoading);

  useEffect(() => {
    setDocumentTitle('Sign In');
    dispatch(signInError({ code: 0, message: [''] }));
    dispatch(signUpRequireVerification({ requireVerification: false }));

    return () => {
      dispatch(resetCaptchaState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (requireEmailVerification) {
      history.push('/trading');
    }
  }, [requireEmailVerification, history, email]);

  useEffect(() => {
    if (isLoggedIn) {
      setLocation(getSearchParam('back') ?? ' /wallets', history);
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    if (captchaType() !== 'none' && captchaLogin() && errorSignIn && !require2FA) {
      dispatch(resetCaptchaState());
    }
  }, [errorSignIn, dispatch, require2FA]);

  const refreshError = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleSignIn = () => {
    dispatch(
      signIn({
        email,
        password,
        ...(code && { otp_code: code }),
        ...(captchaType() !== 'none' && captchaLogin() && { captcha_response: captchaResponse }),
      }),
    );
  };

  const validateForm = () => {
    const isEmailValid = email.match(EMAIL_REGEX);

    if (!isEmailValid) {
      setEmailError(t(ERROR_INVALID_EMAIL));
      setPasswordError('');

      return;
    }
    if (!password) {
      setEmailError('');
      setPasswordError(t(ERROR_EMPTY_PASSWORD));
    }
  };

  const isValidForm = () => {
    const isEmailValid = email.match(EMAIL_REGEX);
    return email && isEmailValid && password && (!require2FA || isValidCode(code));
  };

  const isButtonDisabled = () =>
    !!(captchaLogin() && captchaType() !== 'none' && !(reCaptchaSuccess || geetestCaptchaSuccess));

  const handleSubmitForm = () => {
    refreshError();
    handleSignIn();
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

  const handleTabSelected = (value: string) => {
    if (value === 'signup') {
      history.push('/signup');
    }
  };

  const isLoading = loading || signInLoading;

  return (
    <form>
      <Box padding="3" col spacing="3" onKeyPress={handleEnterPress}>
        <Tabs value="signin" onSelectionChange={handleTabSelected}>
          <Box grow justify="around" as={TabList}>
            <Box flex="1" as={Tab} className={s.tab} size="large" value="signin">
              {t('page.header.signIn')}
            </Box>
            <Box flex="1" as={Tab} className={s.tab} size="large" value="signup">
              {t('page.header.signUp')}
            </Box>
          </Box>
        </Tabs>
        <TextInput
          type="email"
          label={t('page.header.signIn.email')}
          labelVisible
          onChange={setEmail}
          value={email}
          autoFocus
          error={emailError}
        />
        <PasswordInput
          label={t('page.header.signIn.password')}
          labelVisible
          onChange={setPassword}
          value={password}
          error={passwordError}
        />
        {captchaLogin() && <Captcha error={errorSignIn || emailError} />}
        {require2FA ? (
          <TextInput
            label={t('2FA code')}
            placeholder={t('Enter 2FA code from the app')}
            value={code}
            onChange={setCode}
            autoFocus
            maxLength="6"
          />
        ) : null}
        <Button disabled={isLoading || !isValidForm() || isButtonDisabled()} onClick={handleClick}>
          {isLoading ? `${t('Loading')}...` : t('page.header.signIn')}
        </Button>
        <Box self="center" as={Link} to={{ pathname: '/forgot_password', state: { email } }}>
          {t('page.header.signIn.forgotPassword')}
        </Box>
      </Box>
    </form>
  );
};
