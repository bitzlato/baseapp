import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useT } from 'src/hooks/useT';
import { selectMemberLevels, selectMobileDeviceState } from 'src/modules';
import { defaultBeneficiary } from 'src/modules/user/beneficiaries/defaults';
import { Blur } from 'src/components/Blur';
import { ModalWithdrawConfirmation, ModalWithdrawSubmit } from 'src/containers';
import { useBeneficiariesFetch } from 'src/hooks';
import { Beneficiary } from 'src/modules/user/beneficiaries';
import { selectUserInfo } from 'src/modules/user/profile';
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

  const t = useT();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const withdrawSuccess = useSelector(selectWithdrawSuccess);
  const memberLevels = useSelector(selectMemberLevels);
  const isMobileDevice = useSelector(selectMobileDeviceState);

  const { currency } = wallet;

  useBeneficiariesFetch({ currency_id: currency.code.toLowerCase() });

  React.useEffect(() => {
    if (withdrawSuccess) {
      toggleSubmitModal();
    }
  }, [withdrawSuccess]);

  const getConfirmationAddress = () => {
    let confirmationAddress = '';

    if (wallet) {
      confirmationAddress =
        wallet.type === 'fiat'
          ? withdrawData.beneficiary.name
          : withdrawData.beneficiary.data
          ? (withdrawData.beneficiary.data.address as string)
          : '';
    }

    return confirmationAddress;
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

  const renderBlur = () => {
    if (!wallet?.withdrawal_enabled) {
      return (
        <Blur
          text={
            wallet.withdrawal_disabled_reason ||
            t('page.body.wallets.tabs.withdraw.disabled.message')
          }
        />
      );
    }
    if (user.level < (memberLevels?.withdraw.minimum_level ?? 0)) {
      return (
        <Blur
          text={t('page.body.wallets.warning.withdraw.verification')}
          onClick={() => history.push('/confirm')}
          linkText={t('page.body.wallets.warning.withdraw.verification.button')}
        />
      );
    }
    if (!user.otp) {
      if (isMobileDevice) {
        return (
          <Blur
            text={t('page.body.wallets.tabs.withdraw.content.enable2fa')}
            onClick={() => () => history.push('/profile/2fa', { enable2fa: true })}
            linkText={t('page.body.wallets.tabs.withdraw.content.enable2faButton')}
          />
        );
      }
      return (
        <Blur
          text={t('page.body.wallets.warning.withdraw.2fa')}
          linkText={t('page.body.wallets.warning.withdraw.2fa.button')}
          onClick={() => history.push('/security/2fa', { enable2fa: true })}
        />
      );
    }
    return null;
  };

  return (
    <Box
      className={isMobileDevice ? 'cr-mobile-wallet-withdraw-body' : undefined}
      position="relative"
    >
      {renderBlur()}
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
            precision={wallet ? wallet.precision : 0}
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
          precision={wallet ? wallet.precision : 0}
          rid={getConfirmationAddress()}
          onSubmit={handleWithdraw}
          onDismiss={toggleConfirmModal}
        />
      )}
    </Box>
  );
};
