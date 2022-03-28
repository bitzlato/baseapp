import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { captchaId, captchaType } from '../../api/config';
import { GeetestCaptcha } from '../../containers';
import { useSetShouldGeetestReset } from '../../hooks';
import {
  GeetestCaptchaResponse,
  selectCurrentColorTheme,
  selectShouldGeetestReset,
  selectSignInRequire2FA,
  setGeetestCaptchaSuccess,
  setRecaptchaSuccess,
} from '../../modules';

export const CaptchaComponent = (props: any) => {
  const dispatch = useDispatch();
  const shouldGeetestReset = useSelector(selectShouldGeetestReset);
  const theme = useSelector(selectCurrentColorTheme);
  const require2FA = useSelector(selectSignInRequire2FA);

  const reCaptchaRef = React.useRef<ReCAPTCHA>(null);
  const geetestCaptchaRef = React.useRef(null);

  React.useEffect(() => {
    if (props.error || props.success) {
      reCaptchaRef.current?.reset();
    }
  }, [props.error, props.success, reCaptchaRef.current]);

  React.useEffect(() => {
    if (require2FA) {
      reCaptchaRef.current?.reset();
    }
  }, [require2FA]);

  useSetShouldGeetestReset(props.error, props.success, geetestCaptchaRef);

  const handleRecaptchaChange = (value: string | null) => {
    dispatch(setRecaptchaSuccess({ captcha_response: value ?? undefined }));
  };

  const handleGeetestCaptchaChange = (value?: GeetestCaptchaResponse) => {
    dispatch(setGeetestCaptchaSuccess({ captcha_response: value }));
  };

  const renderCaptcha = () => {
    switch (captchaType()) {
      case 'recaptcha': {
        const sitekey = captchaId();
        return (
          <div className="pg-captcha--recaptcha">
            <ReCAPTCHA
              ref={reCaptchaRef}
              sitekey={sitekey}
              onChange={handleRecaptchaChange}
              theme={theme}
            />
          </div>
        );
      }
      case 'geetest':
        return (
          <div className="pg-captcha--geetest">
            <GeetestCaptcha
              // @ts-expect-error
              ref={geetestCaptchaRef}
              shouldCaptchaReset={shouldGeetestReset}
              onSuccess={handleGeetestCaptchaChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return renderCaptcha();
};

export const Captcha = React.memo(CaptchaComponent);
