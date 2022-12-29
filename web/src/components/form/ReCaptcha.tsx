import { forwardRef } from 'react';
import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha';
import { Box } from 'web/src/components/ui/Box';

export interface ReCaptchaProps extends ReCAPTCHAProps {}

export const ReCaptcha = forwardRef<ReCAPTCHA, ReCaptchaProps>((props, ref) => (
  <Box display="flex" justifyContent="center">
    <ReCAPTCHA ref={ref} {...props} />
  </Box>
));
