import { useState, KeyboardEvent, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { TextInput } from 'web/src/components/Input/TextInput';
import { Box } from 'web/src/components/Box/Box';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { useDocumentTitle } from 'web/src/hooks';
import { CloseIcon } from 'web/src/assets/images/CloseIcon';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import {
  passwordErrorFirstSolution,
  passwordErrorSecondSolution,
  passwordErrorThirdSolution,
} from 'web/src/helpers/passwordValidation';
import { entropyPasswordFetch } from 'web/src/modules/user/auth/actions';
import { ERROR_PASSWORD_CONFIRMATION, PASSWORD_REGEX } from 'web/src/helpers/emailValidation';
import { PasswordStrengthMeter } from 'web/src/components/PasswordStrengthMeter';
import { passwordMinEntropy } from 'web/src/api/config';
import { selectCurrentPasswordEntropy } from 'web/src/modules/user/auth/selectors';
import { changeForgotPasswordFetch } from 'web/src/modules/user/password/actions';
import { getSearchParam } from 'web/src/helpers/url';
import { changeLanguage } from 'web/src/modules/public/i18n/actions';
import { selectChangeForgotPasswordSuccess } from 'web/src/modules/user/password/selectors';

export const ResetPassword: FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] = useState(false);
  const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] = useState(false);
  const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] = useState(false);
  const [passwordPopUp, setPasswordPopUp] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const t = useT();
  const currentPasswordEntropy = useSelector(selectCurrentPasswordEntropy);
  const changeForgotPassword = useSelector(selectChangeForgotPasswordSuccess);

  useDocumentTitle('Change forgotten password');

  const isNewPasswordValid = newPassword.match(PASSWORD_REGEX) != null;
  const isConfirmPasswordValid = isNewPasswordValid && newPassword === confirmPassword;
  const confirmPasswordError = !isConfirmPasswordValid ? t(ERROR_PASSWORD_CONFIRMATION) : undefined;
  const isValidForm = isNewPasswordValid && isConfirmPasswordValid;

  useEffect(() => {
    const lang = getSearchParam('lang');
    if (lang) {
      dispatch(changeLanguage(lang.toLowerCase()));
    }
  }, [dispatch]);

  useEffect(() => {
    if (changeForgotPassword) {
      history.push('/signin');
    }
  }, [history, changeForgotPassword]);

  const handleSubmitForm = () => {
    dispatch(
      changeForgotPasswordFetch({
        password: newPassword,
        confirm_password: confirmPassword,
        reset_password_token: getSearchParam('reset_token') ?? '',
      }),
    );

    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChangeNewPassword = (value: string) => {
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

    setNewPassword(value);
    setTimeout(() => {
      dispatch(entropyPasswordFetch({ password: value }));
    }, 500);
  };

  const handleClick = (e?: MouseEvent) => {
    e?.preventDefault();
    if (isValidForm) {
      handleSubmitForm();
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
            {t('page.header.signIn.resetPassword.title')}
          </Box>
          <IconButton onClick={handleGoBack}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box col>
          <TextInput
            type="password"
            autocomplete="new-password"
            label={t('page.body.profile.header.account.content.password.new')}
            labelVisible
            value={newPassword}
            onChange={handleChangeNewPassword}
            onFocus={() => setPasswordPopUp(true)}
            onBlur={() => setPasswordPopUp(false)}
            autoFocus
          />
          {newPassword ? (
            <PasswordStrengthMeter
              minPasswordEntropy={passwordMinEntropy()}
              currentPasswordEntropy={currentPasswordEntropy}
              passwordExist={newPassword !== ''}
              passwordErrorFirstSolved={passwordErrorFirstSolved}
              passwordErrorSecondSolved={passwordErrorSecondSolved}
              passwordErrorThirdSolved={passwordErrorThirdSolved}
              passwordPopUp={passwordPopUp}
              translate={t}
            />
          ) : null}
        </Box>
        <TextInput
          type="password"
          autocomplete="new-password"
          label={t('page.body.profile.header.account.content.password.conf')}
          labelVisible
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={confirmPasswordError}
        />
        <Button disabled={!isValidForm} onClick={handleClick}>
          {t('page.body.profile.header.account.content.password.button.change')}
        </Button>
      </Box>
    </form>
  );
};
