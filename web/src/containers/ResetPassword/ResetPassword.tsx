import { useState, KeyboardEvent, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Box } from 'web/src/components/Box/Box';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { useDocumentTitle } from 'web/src/hooks';
import { CloseIcon } from 'web/src/assets/images/CloseIcon';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { ERROR_PASSWORD_CONFIRMATION, PASSWORD_REGEX } from 'web/src/helpers/emailValidation';
import { changeForgotPasswordFetch } from 'web/src/modules/user/password/actions';
import { getSearchParam } from 'web/src/helpers/url';
import { selectChangeForgotPasswordSuccess } from 'web/src/modules/user/password/selectors';
import { PasswordInput } from 'web/src/components/Input/PasswordInput';
import { useChangeLang } from 'web/src/hooks/useChangeLang';
import { Language } from 'web/src/types';
import { PasswordWithMeter } from '../PasswordWithMeter/PasswordWithMeter';

export const ResetPassword: FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changeLanguage = useChangeLang();
  const dispatch = useDispatch();
  const history = useHistory();
  const t = useT();
  const changeForgotPassword = useSelector(selectChangeForgotPasswordSuccess);

  useDocumentTitle('Change forgotten password');

  const isNewPasswordValid = newPassword.match(PASSWORD_REGEX) != null;
  const isConfirmPasswordValid = isNewPasswordValid && newPassword === confirmPassword;
  const confirmPasswordError =
    !isConfirmPasswordValid && confirmPassword !== '' ? t(ERROR_PASSWORD_CONFIRMATION) : undefined;
  const isValidForm = isNewPasswordValid && isConfirmPasswordValid;

  useEffect(() => {
    const lang = getSearchParam('lang')?.toLowerCase() as Language | null;
    if (lang) {
      changeLanguage(lang);
    }
  }, [changeLanguage]);

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
        <PasswordWithMeter
          label={t('page.body.profile.header.account.content.password.new')}
          labelVisible
          value={newPassword}
          onChange={setNewPassword}
          autoFocus
        />
        <PasswordInput
          autoComplete="new-password"
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
