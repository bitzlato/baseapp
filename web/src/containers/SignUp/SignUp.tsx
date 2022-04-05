import { useEffect, useState, KeyboardEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getSearchParam, setLocation } from 'web/src/helpers/url';
import { TextInput } from 'web/src/components/Input/TextInput';
import { Captcha } from 'web/src/components/Captcha';
import { Box } from 'web/src/components/Box/Box';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Tab, TabList, Tabs } from 'web/src/components/Tabs';
import { useShallowSelector } from 'web/src/hooks';
import {
  selectSignInRequire2FA,
  selectUserLoggedIn,
  selectRecaptchaSuccess,
  selectGeetestCaptchaSuccess,
  selectCaptchaResponse,
  resetCaptchaState,
  selectSignUpRequireVerification,
  selectCurrentPasswordEntropy,
  entropyPasswordFetch,
  selectSignUpError,
  signUp,
  selectCurrentLanguage,
} from 'web/src/modules';
import {
  EMAIL_REGEX,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_PASSWORD,
  ERROR_PASSWORD_CONFIRMATION,
  passwordErrorFirstSolution,
  passwordErrorSecondSolution,
  passwordErrorThirdSolution,
  PASSWORD_REGEX,
  setDocumentTitle,
} from 'web/src/helpers';
import { captchaType, captchaLogin, passwordMinEntropy, showReferal } from 'web/src/api';
import { PasswordStrengthMeter } from 'web/src/components/PasswordStrengthMeter';
import { Checkbox } from 'web/src/components/form/Checkbox';
import { PasswordInput } from 'web/src/components/Input/PasswordInput';
import s from 'web/src/containers/SignIn/SignIn.postcss';

export const SignUp: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const t = useT();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmationError, setConfirmationError] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] = useState(false);
  const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] = useState(false);
  const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] = useState(false);
  const [passwordPopUp, setPasswordPopUp] = useState(false);
  const [referalCode, setReferalCode] = useState('');
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const isLoggedIn = useSelector(selectUserLoggedIn);
  const require2FA = useSelector(selectSignInRequire2FA);
  const requireEmailVerification = useSelector(selectSignUpRequireVerification);
  const signUpError = useShallowSelector(selectSignUpError);
  const reCaptchaSuccess = useSelector(selectRecaptchaSuccess);
  const geetestCaptchaSuccess = useSelector(selectGeetestCaptchaSuccess);
  const captchaResponse = useShallowSelector(selectCaptchaResponse);
  const currentPasswordEntropy = useSelector(selectCurrentPasswordEntropy);
  const currentLanguage = useSelector(selectCurrentLanguage);

  useEffect(() => {
    setDocumentTitle('Sign Up');

    if (showReferal()) {
      const localReferralCode = localStorage.getItem('referralCode');
      const refId = getSearchParam('refid');
      const value = refId || localReferralCode || '';
      setReferalCode(value);
      if (refId && refId !== localReferralCode) {
        localStorage.setItem('referralCode', value);
      }
    }

    return () => {
      dispatch(resetCaptchaState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (requireEmailVerification) {
      history.push('/email-verification', { email });
    }
  }, [requireEmailVerification, history, email]);

  useEffect(() => {
    if (isLoggedIn) {
      setLocation(getSearchParam('back') ?? ' /wallets', history);
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    if (captchaType() !== 'none' && captchaLogin() && signUpError && !require2FA) {
      dispatch(resetCaptchaState());
    }
  }, [signUpError, dispatch, require2FA]);

  const validateForm = () => {
    const isEmailValid = email.match(EMAIL_REGEX);
    const isPasswordValid = password.match(PASSWORD_REGEX);
    const isConfirmPasswordValid = password === confirmPassword;

    setEmailError(isEmailValid ? '' : t(ERROR_INVALID_EMAIL));
    setPasswordError(isPasswordValid ? '' : t(ERROR_INVALID_PASSWORD));
    setConfirmationError(isConfirmPasswordValid ? '' : t(ERROR_PASSWORD_CONFIRMATION));

    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      setHasConfirmed(false);
    }
  };

  const isValidForm = () => {
    const isEmailValid = email.match(EMAIL_REGEX);
    const isPasswordValid = password.match(PASSWORD_REGEX);
    const isConfirmPasswordValid = password === confirmPassword;

    return (
      email &&
      isEmailValid &&
      password &&
      isPasswordValid &&
      confirmPassword &&
      isConfirmPasswordValid
    );
  };

  const isButtonDisabled = () => {
    if (!hasConfirmed || !email.match(EMAIL_REGEX) || !password || !confirmPassword) {
      return true;
    }

    const captchaTypeValue = captchaType();

    if (captchaTypeValue === 'recaptcha' && !reCaptchaSuccess) {
      return true;
    }

    if (captchaTypeValue === 'geetest' && !geetestCaptchaSuccess) {
      return true;
    }

    return false;
  };

  const handleSubmitForm = () => {
    dispatch(
      signUp({
        email,
        password,
        data: JSON.stringify({ language: currentLanguage }),
        ...(referalCode && { refid: referalCode }),
        ...(captchaType() !== 'none' && { captcha_response: captchaResponse }),
      }),
    );
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

  const handleTabSelected = (value: string) => {
    if (value === 'signin') {
      history.push('/signin');
    }
  };

  const handleChangePassword = (value: string) => {
    if (passwordErrorFirstSolution(value) && !passwordErrorFirstSolved) {
      setPasswordErrorFirstSolved(true);
    } else if (!passwordErrorFirstSolution(value) && passwordErrorFirstSolved) {
      setPasswordErrorFirstSolved(false);
    }

    if (passwordErrorSecondSolution(value) && !passwordErrorSecondSolved) {
      setPasswordErrorSecondSolved(true);
    } else if (!passwordErrorSecondSolution(value) && passwordErrorSecondSolved) {
      setPasswordErrorSecondSolved(false);
    }

    if (passwordErrorThirdSolution(value) && !passwordErrorThirdSolved) {
      setPasswordErrorThirdSolved(true);
    } else if (!passwordErrorThirdSolution(value) && passwordErrorThirdSolved) {
      setPasswordErrorThirdSolved(false);
    }

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setPassword(value);
    setTypingTimeout(
      window.setTimeout(() => {
        dispatch(entropyPasswordFetch({ password: value }));
      }, 500),
    );
  };

  const handleChangeCheckbox = () => {
    setHasConfirmed(!hasConfirmed);
  };

  return (
    <form>
      <Box padding="3" col spacing="3" onKeyPress={handleEnterPress}>
        <Tabs value="signup" onSelectionChange={handleTabSelected}>
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
          label={t('page.header.signUp.email')}
          labelVisible
          value={email}
          onChange={setEmail}
          error={emailError}
          autoFocus
        />
        <Box col>
          <PasswordInput
            label={t('page.header.signUp.password')}
            labelVisible
            value={password}
            onChange={handleChangePassword}
            onFocus={() => setPasswordPopUp(true)}
            onBlur={() => setPasswordPopUp(false)}
            error={passwordError}
          />
          {password ? (
            <PasswordStrengthMeter
              minPasswordEntropy={passwordMinEntropy()}
              currentPasswordEntropy={currentPasswordEntropy}
              passwordExist={password !== ''}
              passwordErrorFirstSolved={passwordErrorFirstSolved}
              passwordErrorSecondSolved={passwordErrorSecondSolved}
              passwordErrorThirdSolved={passwordErrorThirdSolved}
              passwordPopUp={passwordPopUp}
              translate={t}
            />
          ) : null}
        </Box>
        <PasswordInput
          label={t('page.header.signUp.confirmPassword')}
          labelVisible
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={confirmationError}
        />
        {showReferal() ? (
          <TextInput
            label={t('page.header.signUp.referalCode')}
            labelVisible
            value={referalCode}
            onChange={setReferalCode}
          />
        ) : null}
        <Checkbox name="terms" checked={hasConfirmed} onChange={handleChangeCheckbox}>
          {t('page.header.signUp.terms')}
        </Checkbox>
        {captchaLogin() && <Captcha error={signUpError || confirmationError || emailError} />}
        <Button disabled={isButtonDisabled()} onClick={handleClick}>
          {t('page.header.signUp')}
        </Button>
      </Box>
    </form>
  );
};
