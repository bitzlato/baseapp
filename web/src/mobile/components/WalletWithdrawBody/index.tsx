import classnames from 'classnames';
import * as React from 'react';
import { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectMemberLevels } from 'src/modules';
import { defaultBeneficiary } from 'src/modules/user/beneficiaries/defaults';
import { Blur } from '../../../components/Blur';
import { ModalWithdrawSubmit, Withdraw } from '../../../containers';
import { useBeneficiariesFetch, useCurrenciesFetch } from '../../../hooks';
import { selectCurrencies } from '../../../modules/public/currencies';
import { Beneficiary } from '../../../modules/user/beneficiaries';
import { selectUserInfo } from '../../../modules/user/profile';
import {
  selectWithdrawSuccess,
  Wallet,
  walletsWithdrawCcyFetch,
} from '../../../modules/user/wallets';
import { ModalWithdrawConfirmation } from '../../components';

interface Props {
  wallet: Wallet;
}

const WalletWithdrawBodyComponent: React.FC<Props> = (props) => {
  const [withdrawSubmitModal, setWithdrawSubmitModal] = React.useState(false);
  const [withdrawData, setWithdrawData] = React.useState({
    amount: '',
    beneficiary: defaultBeneficiary,
    otpCode: '',
    withdrawConfirmModal: false,
    total: '',
    withdrawDone: false,
  });

  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const currencies = useSelector(selectCurrencies);
  const withdrawSuccess = useSelector(selectWithdrawSuccess);
  const memberLevels = useSelector(selectMemberLevels);
  const { currency, withdraw_fee, type, enable_invoice } = props.wallet;
  const fixed = (props.wallet || { precision: 0 }).precision;
  const withdrawAmountLabel = React.useMemo(
    () => intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.amount' }),
    [intl],
  );
  const withdraw2faLabel = React.useMemo(
    () => intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.code2fa' }),
    [intl],
  );
  const withdrawButtonLabel = React.useMemo(
    () => intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.button' }),
    [intl],
  );
  const currencyLower = currency.code.toLowerCase();
  const currencyItem = currencies && currencies.find((item) => item.id === currencyLower);

  const isTwoFactorAuthRequired = (level: number, is2faEnabled: boolean) => {
    return level > 1 || (level === 1 && is2faEnabled);
  };

  const getConfirmationAddress = () => {
    let confirmationAddress = '';

    if (props.wallet) {
      confirmationAddress =
        props.wallet.type === 'fiat'
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
    if (!props.wallet) {
      return;
    }

    const withdrawRequest = {
      amount,
      currency: currency.code.toLowerCase(),
      otp: otpCode,
      beneficiary_id: String(beneficiary.id),
    };
    dispatch(walletsWithdrawCcyFetch(withdrawRequest));
    toggleConfirmModal();
  };

  const renderOtpDisabled = () => {
    return (
      <div className="cr-mobile-wallet-withdraw__otp-disabled">
        <span className="cr-mobile-wallet-withdraw__otp-disabled__text">
          {intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.enable2fa' })}
        </span>
        <Button
          block={true}
          onClick={() => history.push('/profile/2fa', { enable2fa: true })}
          size="lg"
          variant="primary"
        >
          {intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.enable2faButton' })}
        </Button>
      </div>
    );
  };

  useBeneficiariesFetch();
  useCurrenciesFetch();

  React.useEffect(() => {
    if (withdrawSuccess) {
      toggleSubmitModal();
    }
  }, [withdrawSuccess]);

  const className = classnames('cr-mobile-wallet-withdraw-body', {
    'cr-mobile-wallet-withdraw-body--disabled': currencyItem && !currencyItem.withdrawal_enabled,
  });

  const renderContent = useMemo(() => {
    if (!currencyItem?.withdrawal_enabled) {
      return (
        <Blur
          className="pg-blur-withdraw"
          text={intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.disabled.message' })}
        />
      );
    }

    if (user.level < (memberLevels?.withdraw.minimum_level ?? 0)) {
      return (
        <Blur
          className={`pg-blur-withdraw pg-blur-withdraw-${currencyItem?.type}`}
          text={intl.formatMessage({ id: 'page.body.wallets.warning.withdraw.verification' })}
          onClick={() => history.push('/confirm')}
          linkText={intl.formatMessage({
            id: 'page.body.wallets.warning.withdraw.verification.button',
          })}
        />
      );
    }

    if (!user.otp) {
      return renderOtpDisabled();
    }

    return (
      <Withdraw
        isMobileDevice
        fee={withdraw_fee}
        type={type}
        fixed={fixed}
        currency={currency}
        onClick={toggleConfirmModal}
        withdrawAmountLabel={withdrawAmountLabel}
        withdraw2faLabel={withdraw2faLabel}
        withdrawDone={withdrawData.withdrawDone}
        withdrawButtonLabel={withdrawButtonLabel}
        twoFactorAuthRequired={isTwoFactorAuthRequired(user.level, user.otp)}
        wallet={props.wallet}
        enableInvoice={enable_invoice}
      />
    );
  }, [
    currencyItem?.withdrawal_enabled,
    user.level,
    user.otp,
    memberLevels?.withdraw.minimum_level,
    withdraw_fee,
    type,
    fixed,
    currency,
    withdrawAmountLabel,
    withdraw2faLabel,
    withdrawData.withdrawDone,
    withdrawButtonLabel,
  ]);

  return (
    <div className={className}>
      {renderContent}
      <div className="cr-mobile-wallet-withdraw-body__submit">
        <ModalWithdrawSubmit
          isMobileDevice
          show={withdrawSubmitModal}
          currency={currency.code}
          onSubmit={toggleSubmitModal}
        />
      </div>
      <div className="cr-mobile-wallet-withdraw-body__confirmation">
        <ModalWithdrawConfirmation
          show={withdrawData.withdrawConfirmModal}
          amount={withdrawData.total}
          currency={currency.code}
          precision={currencyItem ? currencyItem.precision : 0}
          rid={getConfirmationAddress()}
          onSubmit={handleWithdraw}
          onDismiss={toggleConfirmModal}
        />
      </div>
    </div>
  );
};

export const WalletWithdrawBody = React.memo(WalletWithdrawBodyComponent);
