import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from 'web/src/components/ui/Button';
import { Field } from 'web/src/components/form/Field';
import { Label } from 'web/src/components/form/Label';
import { HelperText } from 'web/src/components/form/HelperText';
import { ErrorMessage } from 'web/src/components/form/ErrorMessage';
import { Input } from 'web/src/components/form/Input';
import { InputPassword } from 'web/src/components/form/InputPassword';
import { ReCaptcha } from 'web/src/components/form/ReCaptcha';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import {
  EMAIL_REGEX,
  ERROR_EMPTY_PASSWORD,
  ERROR_INVALID_EMAIL,
} from 'web/src/helpers/emailValidation';
import { captchaLogin } from 'web/src/api/config';
import { SignInValues, useSignIn } from 'web/src/hooks/mutations/barong/useSignIn';
import { FetchError } from 'web/src/helpers/fetch';
import { useReCaptchaController } from 'web/src/components/form/useRecaptchaController';
import { getResourceUsersMeEndpoint } from 'web/src/hooks/data/barong/useFetchResourceUsersMe';
import { setCSRFToken } from 'web/src/helpers/CSRFToken';
import { applyReferral } from 'web/src/containers/SignUp/P2PApplyReferral';
import { User } from 'web/src/modules/user/profile/types';
import { SharedTranslateFn } from 'web/src/components/shared/sharedI18n';

interface Props {
  t: SharedTranslateFn;
  onLoggedIn?: ((user: User | undefined) => void) | undefined;
}

export const SignInForm: FC<Props> = ({ t, onLoggedIn }) => {
  const {
    control,
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({ mode: 'onBlur' });
  const recaptcha = useReCaptchaController({ name: 'captcha_response', control });
  const isCaptchaEnabled = captchaLogin();
  const [signIn] = useSignIn();
  const [require2FA, setRequire2FA] = useState(false);
  const [formFetchError, setFormFetchError] = useState<FetchError>();

  const onSubmit: SubmitHandler<SignInValues> = async (values) => {
    setFormFetchError(undefined);

    try {
      const user = await signIn(values, undefined, {
        swrKey: getResourceUsersMeEndpoint(),
      });

      // TODO: Add switch language

      if (user?.csrf_token) {
        setCSRFToken(user.csrf_token);
      }

      await applyReferral();

      onLoggedIn?.(user);
    } catch (error) {
      if (
        error instanceof FetchError &&
        error.code === 401 &&
        error.messages.includes('identity.session.missing_otp')
      ) {
        if (!require2FA) {
          setRequire2FA(true);

          return;
        }
      } else {
        recaptcha?.ref?.current?.reset();
        resetField('captcha_response');
      }

      if (error instanceof FetchError) {
        setFormFetchError(error);

        return;
      }

      throw error;
    }
  };

  return (
    <Box
      as="form"
      display="flex"
      flexDirection="column"
      gap="4x"
      py="5x"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formFetchError?.messages.map((message) => (
        <Box mb="4x">
          <Text title="large" color="danger" textAlign="center">
            {t(message, formFetchError.payload)}
          </Text>
        </Box>
      ))}

      <Field isInvalid={errors.email !== undefined}>
        <Label htmlFor="signin-email">{t('Email')}</Label>
        <Input
          id="signin-email"
          type="email"
          autoFocus
          {...register('email', {
            required: t(ERROR_INVALID_EMAIL),
            pattern: {
              value: EMAIL_REGEX,
              message: t(ERROR_INVALID_EMAIL),
            },
          })}
        />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      </Field>

      <Field isInvalid={errors.password !== undefined}>
        <Box display="flex" justifyContent="space-between">
          <Label htmlFor="signin-password">{t('Password')}</Label>
          {/* <Box
              as={Link}
              color={{ default: 'interactive', hover: 'interactiveHighlighted' }}
              to={{ pathname: '/forgot_password', state: { email: watch('email') } }}
            >
              {t('page.header.signIn.forgotPassword')}
            </Box> */}
          <Box
            as="a"
            color={{ default: 'interactive', hover: 'textHighlighted' }}
            fontSize="caption"
            href="/forgot_password"
          >
            {t('page.header.signIn.forgotPassword')}
          </Box>
        </Box>
        <InputPassword
          id="signin-password"
          {...register('password', { required: t(ERROR_EMPTY_PASSWORD) })}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
      </Field>

      {isCaptchaEnabled && recaptcha && <ReCaptcha {...recaptcha} />}

      {require2FA && (
        <Field isInvalid={errors.otp_code !== undefined}>
          <Label htmlFor="signin-otp_code">{t('2FA code')}</Label>
          <HelperText>{t('Enter 2FA code from the app')}</HelperText>
          <Input
            id="signin-otp_code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            autoFocus
            {...register('otp_code', {
              required: t('identity.session.invalid_otp'),
              minLength: {
                value: 6,
                message: t('identity.session.invalid_otp'),
              },
              maxLength: {
                value: 6,
                message: t('identity.session.invalid_otp'),
              },
            })}
          />
          <ErrorMessage>{errors.otp_code?.message}</ErrorMessage>
        </Field>
      )}

      <Button type="submit" data-gtm-click="signin" disabled={isSubmitting}>
        {isSubmitting ? t('Loading...') : t('page.header.navbar.signIn')}
      </Button>

      <Box textAlign="center">
        <Box
          as="a"
          color={{ default: 'text', hover: 'textHighlighted' }}
          fontSize="caption"
          href="/signup"
        >
          {t('page.header.signIN.noAccountYet')}
        </Box>
      </Box>
    </Box>
  );
};
