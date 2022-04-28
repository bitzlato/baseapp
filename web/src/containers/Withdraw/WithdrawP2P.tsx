import { FC, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCountdown } from 'web/src/hooks/useCountdown';
import { useT } from 'web/src/hooks/useT';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/Box';
import { createCcy } from 'web/src/helpers/money';
import { OTP_TIMEOUT } from 'web/src/helpers/codeValidation';
import { DEFAULT_CCY_PRECISION } from 'web/src/constants';
import { useP2PWithdrawal } from 'web/src/hooks/mutations/useP2PWithdrawal';
import { Modal2 } from 'web/src/components/Modal/Modal2';
import { ModalWithdrawP2PConfirmation } from 'web/src/containers/Withdraw/ModalWithdrawP2PConfirmation';
import { P2PWithdrawalParams } from 'web/src/modules/p2p/withdrawal';
import { FetchError } from 'web/src/helpers/fetch';
import { WithdrawP2PForm } from 'web/src/containers/Withdraw/WithdrawP2PForm';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import { ProposalToEnableOTP } from 'web/src/components/profile/ProposalToEnableOTP';
import { SafeModeWizardModal } from 'web/src/components/profile/settings/SafeModeWizardModal';
import { alertPush } from 'web/src/modules';
import { alertFetchError } from 'web/src/helpers/alertFetchError';
import { WithdrawP2PFormValues } from 'web/src/containers/Withdraw/types';
import { formatSeconds } from 'web/src/helpers/formatSeconds';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';

interface Props {
  currencyCode: string;
}

const defaultValue: WithdrawP2PFormValues = {
  amount: '',
  address: '',
  voucher: false,
};

export const WithdrawP2P: FC<Props> = ({ currencyCode }) => {
  const t = useT();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const ccy = useMemo(() => createCcy(currencyCode, DEFAULT_CCY_PRECISION), [currencyCode]);
  const { countdown, start } = useCountdown();

  const [withdrawData, setWithdrawData] = useState<WithdrawP2PFormValues>(defaultValue);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState('');
  const [show2fa, setShow2fa] = useState(false);
  const [show2faProposal, setShow2faProposal] = useState(false);
  const [showWithdrawDisabled, setShowWithdrawDisabled] = useState(false);
  const [withdrawDone, setWithdrawDone] = useState(false);
  const [showSafeModeWizard, setShowSafeModeWizard] = useState(false);

  const [p2pWithdrawalMutate] = useP2PWithdrawal();

  const withdrawP2P = async (params: P2PWithdrawalParams, code: string | null | undefined) => {
    try {
      const response = await p2pWithdrawalMutate({
        params,
        cryptocurrency: currencyCode,
        twoFACode: code,
      });

      setShow2fa(false);

      if (response.email) {
        setEmail(response.email);
      } else {
        setWithdrawDone(true);
        setWithdrawData(defaultValue);
        dispatch(alertPush({ message: ['success.withdraw.action'], type: 'success' }));
      }
    } catch (error) {
      if (error instanceof FetchError) {
        if (error.code === 478 && error.payload.code === 'MfaRequired') {
          setEmail(null);
          setShow2fa(true);

          if (error.payload.message !== '2FA Token Required') {
            alertFetchError(dispatch, error);
          }
        } else if (error.code === 471 && error.payload.code === 'SafetyWizardRequired') {
          setShowSafeModeWizard(true);
        } else if (error.code === 409 && error.payload.code === 'NoTwoFaUserApprove') {
          setShow2faProposal(true);
        } else if (error.code === 403 && error.payload.code === 'Forbidden') {
          setShowWithdrawDisabled(true);
        } else {
          alertFetchError(dispatch, error);
        }
      }
    }
  };

  const handleWithdraw = async (code: string | null | undefined) => {
    const { address, amount, voucher } = withdrawData;
    const params: P2PWithdrawalParams = { address, amount };

    if (voucher) {
      params.voucher = true;
    } else {
      params.standart = true;
    }

    await withdrawP2P(params, code);

    setShowConfirmModal(false);
    start(OTP_TIMEOUT);
  };

  const handleSend2fa = (code: string) => {
    setOtpCode(code);
    handleWithdraw(code);
  };

  const handleSendNo2fa = () => {
    setShow2faProposal(false);
    return handleWithdraw(null);
  };

  const handleSendWithout2fa = () => {
    return handleWithdraw(undefined);
  };

  const handleResendEmail = () => {
    if (otpCode) {
      handleSend2fa(otpCode);
    } else {
      handleSendNo2fa();
    }
  };

  const handleSubmit = (data: WithdrawP2PFormValues) => {
    setWithdrawDone(false);
    setWithdrawData(data);
    setShowConfirmModal(true);
  };

  return (
    <>
      <WithdrawP2PForm
        currency={ccy}
        countdown={countdown}
        withdrawDone={withdrawDone}
        onSubmit={handleSubmit}
      />

      {showConfirmModal ? (
        <ModalWithdrawP2PConfirmation
          show={showConfirmModal}
          amount={withdrawData.amount}
          currency={ccy}
          address={withdrawData.address}
          onSubmit={handleSendWithout2fa}
          onDismiss={() => setShowConfirmModal(false)}
        />
      ) : null}

      {show2fa ? (
        <TwoFactorModal
          onClose={() => setShow2fa(false)}
          onSend={handleSend2fa}
          buttonText={t('withdraw.confirm')}
          text={
            <span>
              {user.bitzlato_user
                ? t('Enter 2FA code from the app for', {
                    name: (
                      <strong>{`${
                        user.bitzlato_user.user_profile.public_name ??
                        user.bitzlato_user.user_profile.generated_name
                      }@Bitzlato.com`}</strong>
                    ),
                  })
                : undefined}
            </span>
          }
        />
      ) : null}

      {email ? (
        <Modal2 show header={t('Confirmation')} onClose={() => setEmail(null)}>
          <Box col spacing="3">
            <span>{t('gift.confirmation_email', { email })}</span>
            <span>{t('gift.check_spam')}</span>
            <Button color="primary" disabled={countdown > 0} onClick={handleResendEmail}>
              {countdown > 0 ? formatSeconds(countdown) : t('Send an email again')}
            </Button>
          </Box>
        </Modal2>
      ) : null}

      {showWithdrawDisabled ? (
        <Modal2 show header={t('Error')} onClose={() => setShowWithdrawDisabled(false)}>
          <Box col spacing="3">
            <span>{t('withdraw.is_disabled')}</span>
            <Button onClick={() => setShowWithdrawDisabled(false)} color="primary">
              {t('OK')}
            </Button>
          </Box>
        </Modal2>
      ) : null}

      <SafeModeWizardModal show={showSafeModeWizard} onClose={() => setShowSafeModeWizard(false)} />

      <ProposalToEnableOTP
        show={show2faProposal}
        onClose={() => setShow2faProposal(false)}
        onSend={handleSendNo2fa}
      />
    </>
  );
};
