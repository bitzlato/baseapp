import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'src/modules';
import { defaultBeneficiary } from 'src/modules/user/beneficiaries/defaults';
import { ModalWithdrawConfirmation, ModalWithdrawSubmit } from 'src/containers';
import { useBeneficiariesFetch } from 'src/hooks';
import { Beneficiary } from 'src/modules/user/beneficiaries';
import { selectWithdrawSuccess, Wallet, walletsWithdrawCcyFetch } from 'src/modules/user/wallets';
import { ModalWithdrawConfirmationMobile } from 'src/mobile/components';
import { Box } from 'src/components/Box/Box';
import { WithdrawBody } from './WithdrawBody';

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
  };

  return (
    <Box
      className={isMobileDevice ? 'cr-mobile-wallet-withdraw-body' : undefined}
      position="relative"
    >
      <WithdrawBody
        onClick={toggleConfirmModal}
        withdrawDone={withdrawData.withdrawDone}
        wallet={wallet}
      />
      <div className={isMobileDevice ? 'cr-mobile-wallet-withdraw-body__submit' : undefined}>
        <ModalWithdrawSubmit
          isMobileDevice={isMobileDevice}
          show={withdrawSubmitModal}
          currency={currency.code}
          onSubmit={toggleSubmitModal}
        />
      </div>
      {isMobileDevice ? (
        <div className="cr-mobile-wallet-withdraw-body__confirmation">
          <ModalWithdrawConfirmationMobile
            show={withdrawData.withdrawConfirmModal}
            amount={withdrawData.total}
            currency={currency.code}
            precision={wallet.precision}
            rid={getConfirmationAddress()}
            onSubmit={handleWithdraw}
            onDismiss={toggleConfirmModal}
          />
        </div>
      ) : (
        <ModalWithdrawConfirmation
          show={withdrawData.withdrawConfirmModal}
          amount={withdrawData.total}
          currency={currency.code}
          precision={wallet.precision}
          rid={getConfirmationAddress()}
          onSubmit={handleWithdraw}
          onDismiss={toggleConfirmModal}
        />
      )}
    </Box>
  );
};
