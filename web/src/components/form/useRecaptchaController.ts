import { RefObject, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { captchaId, captchaType } from 'web/src/api/config';
import { useTheme } from 'web/src/components/app/AppContext';
import { ReCaptchaProps } from './ReCaptcha';

export const useReCaptchaController = <TFieldValues extends FieldValues = FieldValues>(
  props: UseControllerProps<TFieldValues>,
): (ReCaptchaProps & { ref: RefObject<ReCAPTCHA> }) | undefined => {
  const {
    field: { onChange },
  } = useController(props);
  const theme = useTheme();
  const type = captchaType();
  const sitekey = captchaId();

  const ref = useRef<ReCAPTCHA>(null);

  if (type !== 'recaptcha' || !sitekey) {
    return undefined;
  }

  return {
    ref,
    theme,
    sitekey,
    onChange,
  };
};
