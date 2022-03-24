import cr from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { isValidCode } from 'web/src/helpers/codeValidation';
import { CommonError } from 'web/src/modules/types';
import { CustomInput } from '..';
import { captchaLogin } from '../../api';
import { EMAIL_REGEX } from '../../helpers';
import { GeetestCaptchaResponse } from '../../modules';
import { selectMobileDeviceState } from '../../modules/public/globalSettings';
import { TextInput } from '../Input/TextInput';

export interface SignInProps {
  labelSignIn?: string | undefined;
  labelSignUp?: string | undefined;
  emailLabel?: string | undefined;
  passwordLabel?: string | undefined;
  receiveConfirmationLabel?: string | undefined;
  forgotPasswordLabel?: string | undefined;
  isLoading?: boolean | undefined;
  title?: string | undefined;
  onForgotPassword: (email?: string) => void;
  onConfirmationResend?: (email?: string) => void;
  onSignUp: () => void;
  onSignIn: (otp_code: string) => void;
  className?: string | undefined;
  image?: string | undefined;
  email: string;
  emailError: string;
  errorSignIn?: CommonError | undefined;
  password: string;
  passwordError: string;
  emailFocused: boolean;
  emailPlaceholder: string;
  passwordFocused: boolean;
  passwordPlaceholder: string;
  isFormValid: () => void;
  refreshError: () => void;
  handleChangeFocusField: (value: string) => void;
  changePassword: (value: string) => void;
  changeEmail: (value: string) => void;
  captchaType?: 'recaptcha' | 'geetest' | 'none' | undefined;
  renderCaptcha?: JSX.Element | null | undefined;
  reCaptchaSuccess?: boolean | undefined;
  geetestCaptchaSuccess?: boolean | undefined;
  captcha_response?: string | GeetestCaptchaResponse | undefined;
  show2fa?: boolean | undefined;
}

const SignIn: React.FC<SignInProps> = ({
  email,
  emailError,
  errorSignIn,
  emailPlaceholder,
  password,
  passwordError,
  passwordPlaceholder,
  isLoading,
  onSignUp,
  image,
  labelSignIn,
  labelSignUp,
  emailLabel,
  passwordLabel,
  emailFocused,
  passwordFocused,
  onForgotPassword,
  forgotPasswordLabel,
  refreshError,
  onSignIn,
  isFormValid,
  handleChangeFocusField,
  changePassword,
  changeEmail,
  captchaType,
  geetestCaptchaSuccess,
  reCaptchaSuccess,
  renderCaptcha,
  show2fa,
}) => {
  const [code, setCode] = useState('');

  const isMobileDevice = useSelector(selectMobileDeviceState);
  const history = useHistory();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (errorSignIn) {
      setCode('');
    }
  }, [errorSignIn]);

  const isValidForm = () => {
    const isEmailValid = email.match(EMAIL_REGEX);
    return email && isEmailValid && password && (!show2fa || isValidCode(code));
  };

  const handleChangeEmail = React.useCallback(
    (value: string) => {
      changeEmail(value);
    },
    [changeEmail],
  );

  const handleChangePassword = React.useCallback(
    (value: string) => {
      changePassword(value);
    },
    [changePassword],
  );

  const handleFieldFocus = React.useCallback(
    (field: string) => {
      handleChangeFocusField(field);
    },
    [handleChangeFocusField],
  );

  const isSuccessCaptcha = React.useMemo(
    () =>
      !!(captchaLogin() && captchaType !== 'none' && !(reCaptchaSuccess || geetestCaptchaSuccess)),
    [reCaptchaSuccess, geetestCaptchaSuccess],
  );

  const handleSubmitForm = () => {
    refreshError();
    onSignIn(code);
  };

  const handleValidateForm = React.useCallback(() => {
    isFormValid();
  }, [isFormValid]);

  const handleClick = (e?: MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!isValidForm()) {
      handleValidateForm();
    } else {
      handleSubmitForm();
    }
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      handleClick();
    }
  };

  const renderForgotButton = React.useMemo(
    () => (
      <div className="cr-sign-in-form__bottom-section">
        <div
          className="cr-sign-in-form__bottom-section-password"
          onClick={() => onForgotPassword(email)}
        >
          {forgotPasswordLabel || 'Forgot your password?'}
        </div>
      </div>
    ),
    [forgotPasswordLabel, onForgotPassword, email],
  );

  const renderRegister = React.useMemo(
    () => (
      <div className="pg-sign-in-screen__register">
        <span>
          {formatMessage({ id: 'page.header.signIN.noAccountYet' })}
          <span
            onClick={() => history.push('/signup')}
            className="pg-sign-in-screen__register-button"
          >
            {formatMessage({ id: 'page.body.landing.header.button3' })}
          </span>
        </span>
      </div>
    ),
    [formatMessage, history],
  );

  return (
    <form>
      <div className="cr-sign-in-form" onKeyPress={handleEnterPress}>
        {!isMobileDevice && (
          <div className="cr-sign-in-form__options-group">
            <div className="cr-sign-in-form__option">
              <div className="cr-sign-in-form__option-inner __selected">
                {labelSignIn || 'Sign In'}
              </div>
            </div>
            <div className="cr-sign-in-form__option">
              <div
                className="cr-sign-in-form__option-inner cr-sign-in-form__tab-signup"
                onClick={onSignUp}
              >
                {labelSignUp || 'Sign Up'}
              </div>
            </div>
          </div>
        )}
        <div className="cr-sign-in-form__form-content">
          {image ? (
            <h1 className="cr-sign-in-form__title">
              <img className="cr-sign-in-form__image" src={image} alt="logo" />
            </h1>
          ) : null}
          <div
            className={cr('cr-sign-in-form__group', {
              'cr-sign-in-form__group--focused': emailFocused,
            })}
          >
            <CustomInput
              type="email"
              label={emailLabel || 'Email'}
              placeholder={emailFocused ? '' : emailPlaceholder}
              defaultLabel="Email"
              handleChangeInput={handleChangeEmail}
              inputValue={email}
              handleFocusInput={() => handleFieldFocus('email')}
              classNameLabel="cr-sign-in-form__label"
              autoFocus={!isMobileDevice}
              labelVisible={emailFocused}
            />
            {emailError && <div className="cr-sign-in-form__error">{emailError}</div>}
          </div>
          <div
            className={cr('cr-sign-in-form__group', {
              'cr-sign-in-form__group--focused': passwordFocused,
            })}
          >
            <CustomInput
              type="password"
              label={passwordLabel || 'Password'}
              placeholder={passwordFocused ? '' : passwordPlaceholder}
              defaultLabel="Password"
              handleChangeInput={handleChangePassword}
              inputValue={password}
              handleFocusInput={() => handleFieldFocus('password')}
              classNameLabel="cr-sign-in-form__label"
              autoFocus={false}
              labelVisible={passwordFocused}
            />
            {passwordError && <div className="cr-sign-in-form__error">{passwordError}</div>}
          </div>
          {captchaLogin() && renderCaptcha}
          {show2fa ? (
            <TextInput
              className="cr-sign-in-form__group"
              label={formatMessage({ id: '2FA code' })}
              placeholder={formatMessage({ id: 'Enter 2FA code from the app' })}
              value={code}
              onChange={setCode}
              autoFocus
              maxlength="6"
            />
          ) : null}
          {isMobileDevice && renderForgotButton}
          <div className="cr-sign-in-form__button-wrapper">
            <Button
              block
              type="button"
              disabled={isLoading || !isValidForm() || isSuccessCaptcha}
              onClick={handleClick as any}
              size="lg"
              variant="primary"
            >
              {isLoading ? 'Loading...' : labelSignIn || 'Sign in'}
            </Button>
          </div>
          {!isMobileDevice && renderForgotButton}
          {isMobileDevice && renderRegister}
        </div>
      </div>
    </form>
  );
};

export const SignInComponent = React.memo(SignIn);
