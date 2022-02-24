import { FC, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isValidCode, OTP_TIMEOUT } from 'web/src/helpers/codeValidation';
import { formatSeconds } from 'web/src/helpers/formatSeconds';
import { useCountdown } from 'web/src/hooks/useCountdown';
import { useDocumentTitle } from 'web/src/hooks/useDocumentTitle';
import { useT } from 'web/src/hooks/useT';
import { CloseIcon } from '../../assets/images/CloseIcon';
import { CopyableTextField, CustomInput } from '../../components';
import { copy } from '../../helpers';
import { alertPush } from '../../modules';
import {
  generate2faQRFetch,
  selectTwoFactorAuthBarcode,
  selectTwoFactorAuthQR,
  selectTwoFactorAuthSuccess,
  selectUserInfo,
  toggle2faFetch,
  toggle2faSuccess,
} from '../../modules/user/profile';

export const ProfileTwoFactorAuthScreen: FC = () => {
  const [code, setCode] = useState('');

  useDocumentTitle('Two factor authentication');

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(selectUserInfo);
  const barcode = useSelector(selectTwoFactorAuthBarcode);
  const qrUrl = useSelector(selectTwoFactorAuthQR);
  const success = useSelector(selectTwoFactorAuthSuccess);

  const t = useT();

  const { start, countdown } = useCountdown();

  useEffect(() => {
    if (success) {
      dispatch(toggle2faSuccess());
      history.push('/profile');
    } else if (!user.otp) {
      dispatch(generate2faQRFetch());
    }
  }, [success, user.otp]);

  const doCopy = () => {
    copy('referral-id');
    dispatch(
      alertPush({
        message: ['page.body.wallets.tabs.deposit.ccy.message.success'],
        type: 'success',
      }),
    );
  };

  const disabled = user.otp || !isValidCode(code) || countdown > 0;

  const handleEnable2fa = () => {
    if (!disabled) {
      start(OTP_TIMEOUT);
      dispatch(toggle2faFetch({ code: code, enable: true }));
    }
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleEnable2fa();
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const secretRegex = /secret=(\w+)/;
  const secretMatch = qrUrl.match(secretRegex);
  const secret = secretMatch ? secretMatch[1] : null;

  // TODO: use Card

  return (
    <div className="pg-profile-two-factor-auth">
      <div className="container mt-5 pg-profile-two-factor-auth__form p-0">
        <div className="row m-0 pg-profile-two-factor-auth__header">
          <div className="col-11 col-lg-7 offset-lg-4 mt-0 p-0 pl-3">
            {t('page.body.profile.header.account.content.twoFactorAuthentication.header')}
          </div>
          <div className="col-1 mx-0 p-0 px-1" onClick={goBack}>
            <CloseIcon className="close-icon" />
          </div>
        </div>

        <div className="row m-0 pg-profile-two-factor-auth__body">
          <div className="col-12 col-lg-8 col-md-9 pr-0 pl-2 pg-profile-two-factor-auth__body--text d-inline-block">
            <div className="row col-12 pg-profile-two-factor-auth__body--text--group">
              <div className="d-inline">
                <span className="cr-item-number">1 </span>
                <span className="cr-item-text">
                  {t('page.body.profile.header.account.content.twoFactorAuthentication.message.1')}
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://apps.apple.com/app/google-authenticator/id388497605?mt=8"
                >
                  AppStore
                </a>
                <span className="cr-item-text">
                  {' '}
                  {t('page.body.profile.header.account.content.twoFactorAuthentication.message.or')}
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl"
                >
                  Google play
                </a>
              </div>
            </div>
            <div className="row col-12 pg-profile-two-factor-auth__body--text--group">
              <div className="d-inline">
                <span className="cr-item-number">2 </span>
                <span className="cr-item-text">
                  {t('page.body.profile.header.account.content.twoFactorAuthentication.message.2')}
                </span>
                <br />
                <span className="cr-item-text">
                  {t('page.body.profile.header.account.content.twoFactorAuthentication.message.3')}
                </span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 col-md-3 pt-4 pg-profile-two-factor-auth__body--barcode">
            {barcode.length > 0 && (
              <img
                alt=""
                className="pg-profile-two-factor-auth__qr"
                src={`data:image/png;base64,${barcode}`}
              />
            )}
          </div>
        </div>
        <div className="row m-0 p-5 pg-profile-two-factor-auth__copyablefield">
          {secret && (
            <div className="pg-profile-two-factor-auth__copyablefield__container">
              <legend>
                {t('page.body.profile.header.account.content.twoFactorAuthentication.message.mfa')}
              </legend>
              <fieldset onClick={doCopy}>
                <CopyableTextField value={secret} fieldId="secret-2fa" label="" />
              </fieldset>
            </div>
          )}
        </div>
        <div className="row m-0 pg-profile-two-factor-auth__body">
          <div className="col-12 pl-2 pg-profile-two-factor-auth__body--text d-inline-block">
            <div className="row col-12 pg-profile-two-factor-auth__body--text--group">
              <div className="col-12 col-sm-5">
                <span className="cr-item-number">3 </span>
                <span className="cr-item-text">
                  {t('page.body.profile.header.account.content.twoFactorAuthentication.message.4')}
                </span>
              </div>
              <div className="cr-email-form__group">
                <CustomInput
                  handleChangeInput={setCode}
                  type="tel"
                  inputValue={code}
                  placeholder={t(
                    'page.body.profile.header.account.content.twoFactorAuthentication.subHeader',
                  )}
                  onKeyPress={handleEnterPress}
                  label={t(
                    'page.body.profile.header.account.content.twoFactorAuthentication.subHeader',
                  )}
                  defaultLabel=""
                  classNameLabel="cr-email-form__label"
                  classNameInput="cr-email-form__input"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row p-5">
          <div className="col-12 m-0">
            <Button
              onClick={handleEnable2fa}
              size="lg"
              variant="primary"
              type="button"
              block
              disabled={disabled}
            >
              {countdown > 0
                ? formatSeconds(countdown)
                : t('page.body.profile.header.account.content.twoFactorAuthentication.enable')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
