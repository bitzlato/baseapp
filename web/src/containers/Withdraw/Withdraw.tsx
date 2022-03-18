import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'src/modules';
import { defaultBeneficiary } from 'src/modules/user/beneficiaries/defaults';
import { useBeneficiariesFetch } from 'src/hooks';
import { Beneficiary } from 'src/modules/user/beneficiaries';
import { selectWithdrawSuccess, Wallet, walletsWithdrawCcyFetch } from 'src/modules/user/wallets';
import { WithdrawBody } from './WithdrawBody';
import { ModalWithdrawConfirmation } from './ModalWithdrawConfirmation';
import { useCountdown } from 'web/src/hooks/useCountdown';
import { OTP_TIMEOUT } from 'web/src/helpers/codeValidation';
import { Modal2 } from 'web/src/components/Modal/Modal2';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Box } from 'web/src/components/Box/Box';

interface Props {
  wallet: Wallet;
}

export const Withdraw: React.FC<Props> = ({ wallet }) => {
  const [withdrawSubmitModal, setWithdrawSubmitModal] = React.useState(false);
  const [withdrawData, setWithdrawData] = React.useState({
    amount: '',
    beneficiary: defaultBeneficiary,
    otpCode: '',
    withdrawConfirmModal: false,
    total: '',
    withdrawDone: false,
  });

  const dispatch = useDispatch();
  const withdrawSuccess = useSelector(selectWithdrawSuccess);
  const isMobileDevice = useSelector(selectMobileDeviceState);

  const t = useT();

  const { countdown, start } = useCountdown();

  const { currency } = wallet;

  useBeneficiariesFetch({ currency_id: currency.code.toLowerCase() });

  React.useEffect(() => {
    if (withdrawSuccess) {
      toggleSubmitModal();
    }
  }, [withdrawSuccess]);

  const getConfirmationAddress = () => {
    return withdrawData.beneficiary.data ? (withdrawData.beneficiary.data.address as string) : '';
  };

  const toggleConfirmModal = (
    amount?: string,
    total?: string,
    beneficiary?: Beneficiary,
    otpCode?: string,
  ) => {
    setWithdrawData((state: any) => ({
      amount: amount || '',
      beneficiary: beneficiary || defaultBeneficiary,
      otpCode: otpCode || '',
      withdrawConfirmModal: !state.withdrawConfirmModal,
      total: total || '',
      withdrawDone: false,
    }));
  };

  const toggleSubmitModal = () => {
    setWithdrawSubmitModal((state) => !state);
    setWithdrawData((state) => ({ ...state, withdrawDone: true }));
  };

  const handleWithdraw = () => {
    const { otpCode, amount, beneficiary } = withdrawData;
    const withdrawRequest = {
      amount,
      currency: currency.code.toLowerCase(),
      otp: otpCode,
      beneficiary_id: String(beneficiary.id),
    };
    dispatch(walletsWithdrawCcyFetch(withdrawRequest));
    toggleConfirmModal();
    start(OTP_TIMEOUT);
  };

  return (
    <div className={isMobileDevice ? 'cr-mobile-wallet-withdraw-body' : undefined}>
      <WithdrawBody
        onClick={toggleConfirmModal}
        withdrawDone={withdrawData.withdrawDone}
        wallet={wallet}
        countdown={countdown}
      />
      {withdrawSubmitModal ? (
        <Modal2 show header={t('page.modal.withdraw.success')} onClose={toggleSubmitModal}>
          <Box as="span" textAlign="center">
            {t('page.modal.withdraw.success.message.content')}
          </Box>
          <Button onClick={toggleSubmitModal} color="primary">
            {t('page.modal.withdraw.success.button')}
          </Button>
        </Modal2>
      ) : null}
      {withdrawData.withdrawConfirmModal ? (
        <ModalWithdrawConfirmation
          show={withdrawData.withdrawConfirmModal}
          amount={withdrawData.total}
          currency={currency.code}
          precision={wallet.precision}
          rid={getConfirmationAddress()}
          onSubmit={handleWithdraw}
          onDismiss={toggleConfirmModal}
        />
      ) : null}
    </div>
  );
};
