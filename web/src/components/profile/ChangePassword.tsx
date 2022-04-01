import { FC, FormEvent, useState } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Stack } from 'web/src/components/ui/Stack';
import { Spinner } from 'web/src/components/ui/Spinner';
import { useChangePassword } from 'web/src/hooks/mutations/useChangePassword';
import { TextInput } from 'web/src/components/Input/TextInput';
import { AutoFocusInside } from 'react-focus-on';
import SuccessCircle from 'web/src/assets/svg/SuccessCircle.svg';

interface FormState {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  errors?:
    | {
        oldPassword?: string | undefined;
        newPassword?: string | undefined;
        confirmNewPassword?: string | undefined;
      }
    | undefined;
  success?: boolean | undefined;
}

const initialFormState: FormState = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

type Action = 'reset' | 'edit' | 'error' | 'success';

const generateFormState =
  (action: Action, params: Partial<FormState> = {}) =>
  (prev: FormState): FormState => {
    switch (action) {
      case 'edit': {
        return {
          ...prev,
          ...params,
          errors: undefined,
        };
      }

      case 'error': {
        return {
          ...prev,
          errors: params.errors,
        };
      }

      case 'success': {
        return {
          ...initialFormState,
          success: true,
        };
      }

      case 'reset':
      default: {
        return initialFormState;
      }
    }
  };

export const ChangePassword: FC = () => {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [changePassword, changePasswordState] = useChangePassword({
    onSuccess: () => setForm(generateFormState('success')),
  });

  const handleClick = () => setOpen(true);
  const handleClose = () => {
    setForm(generateFormState('reset'));
    setOpen(false);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      setForm(
        generateFormState('error', {
          errors: {
            confirmNewPassword: t('page.body.profile.header.account.content.password.dont.match'),
          },
        }),
      );

      return;
    }

    changePassword({
      old_password: form.oldPassword,
      new_password: form.newPassword,
      confirm_password: form.confirmNewPassword,
    });
  };
  const handleChangeOldPassword = (value: string) =>
    setForm(generateFormState('edit', { oldPassword: value }));
  const handleChangeNewPassword = (value: string) =>
    setForm(generateFormState('edit', { newPassword: value }));
  const handleChangeConfirmNewPassword = (value: string) =>
    setForm(generateFormState('edit', { confirmNewPassword: value }));

  const handleClickChange = () => {};

  return (
    <>
      <Button color="secondary" onClick={handleClick}>
        {t('Password change')}
      </Button>
      <Modal size="lg" show={open} onClose={handleClose}>
        <ModalHeader>{t('Password change')}</ModalHeader>
        {form.success ? (
          <>
            <Box
              display="flex"
              fontSize="medium"
              py="6x"
              alignItems="center"
              flexDirection="column"
            >
              <Box mb="2x">
                <SuccessCircle width="64px" height="64px" viewBox="0 0 30 30" />
              </Box>
              <Text color="success" fontWeight="strong">
                {t('page.body.profile.header.account.content.password.change.success')}
              </Text>
            </Box>
            <Box display="flex" justifyContent="center" px="6x" pt="4x" pb="6x">
              <Button color="secondary" variant="outlined" onClick={handleClose}>
                {t('Close')}
              </Button>
            </Box>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Box mt="3x">
                <Stack direction="column" marginBottom="3x">
                  <AutoFocusInside>
                    <Box
                      as={TextInput}
                      type="password"
                      fontSize="caption"
                      display="flex"
                      pb="2x"
                      label={t('page.body.profile.header.account.content.password.old')}
                      value={form.oldPassword}
                      error={form.errors?.oldPassword}
                      onChange={handleChangeOldPassword}
                    />
                  </AutoFocusInside>

                  <Box
                    as={TextInput}
                    type="password"
                    fontSize="caption"
                    display="flex"
                    pb="2x"
                    label={t('page.body.profile.header.account.content.password.new')}
                    value={form.newPassword}
                    error={form.errors?.newPassword}
                    onChange={handleChangeNewPassword}
                  />

                  <Box
                    as={TextInput}
                    type="password"
                    fontSize="caption"
                    display="flex"
                    pb="2x"
                    label={t('page.body.profile.header.account.content.password.conf')}
                    value={form.confirmNewPassword}
                    error={form.errors?.confirmNewPassword}
                    onChange={handleChangeConfirmNewPassword}
                  />
                </Stack>
              </Box>
            </ModalBody>

            <ModalFooter>
              {changePasswordState.status === 'running' && (
                <>
                  <Spinner />
                  <Box mr="4x" />
                </>
              )}
              <Button
                type="submit"
                color="secondary"
                disabled={
                  form.oldPassword === '' ||
                  form.newPassword === '' ||
                  changePasswordState.status === 'running'
                }
                onClick={handleClickChange}
              >
                {t('page.body.profile.header.account.content.password.button.change')}
              </Button>
            </ModalFooter>
          </form>
        )}
      </Modal>
    </>
  );
};
