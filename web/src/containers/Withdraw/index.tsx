import React from 'react';
import { Button } from 'react-bootstrap';
import { Currency, Money } from '@bitzlato/money-js';
import { Box } from 'src/components/Box';
import { Beneficiaries, CustomInput } from '../../components';
import { cleanPositiveFloatInput, precisionRegExp } from '../../helpers';
import { Beneficiary, Wallet } from '../../modules';
import { WithdrawSummary } from './WithdrawSummary';
import { BeneficiaryAddress } from './BeneficiaryAddress';
import { fromDecimalSilent } from 'src/helpers/fromDecimal';
import s from './Withdraw.postcss';

export interface WithdrawProps {
  currency: Currency;
  fee: Money;
  onClick: (amount: string, total: string, beneficiary: Beneficiary, otpCode: string) => void;
  fixed: number;
  className?: string;
  type: 'fiat' | 'coin';
  enableInvoice: boolean | undefined;
  twoFactorAuthRequired?: boolean;
  withdrawAmountLabel?: string;
  withdraw2faLabel?: string;
  withdrawButtonLabel?: string;
  withdrawDone: boolean;
  isMobileDevice?: boolean;
  wallet: Wallet;
}

const defaultBeneficiary: Beneficiary = {
  id: 0,
  currency: '',
  name: '',
  state: '',
  data: {
    address: '',
  },
};

interface WithdrawState {
  amount: string;
  beneficiary: Beneficiary;
  otpCode: string;
  withdrawAmountFocused: boolean;
  withdrawCodeFocused: boolean;
  total: string;
}

export class Withdraw extends React.Component<WithdrawProps, WithdrawState> {
  public state = {
    amount: '',
    beneficiary: defaultBeneficiary,
    otpCode: '',
    withdrawAmountFocused: false,
    withdrawCodeFocused: false,
    total: '',
  };

  public componentWillReceiveProps(nextProps: WithdrawProps) {
    const { currency, withdrawDone } = this.props;

    if (
      (nextProps && JSON.stringify(nextProps.currency) !== JSON.stringify(currency)) ||
      (nextProps.withdrawDone && !withdrawDone)
    ) {
      this.setState({
        amount: '',
        otpCode: '',
        total: '',
        beneficiary: defaultBeneficiary,
      });
    }
  }

  public render() {
    const { amount, beneficiary, total, otpCode } = this.state;
    const {
      currency,
      type,
      enableInvoice,
      twoFactorAuthRequired,
      withdrawAmountLabel,
      withdrawButtonLabel,
      isMobileDevice,
      wallet,
    } = this.props;

    const label2fa = this.props.withdraw2faLabel || '2FA code';

    return (
      <Box padding={isMobileDevice ? undefined : '3x'} col spacing="3x">
        <Beneficiaries
          currency={currency.code}
          type={type}
          enableInvoice={enableInvoice}
          onChangeValue={this.handleChangeBeneficiary}
        />
        <BeneficiaryAddress beneficiary={beneficiary} />
        <Box grow row spacing="2x">
          <CustomInput
            type="number"
            className={s.numberInput}
            label={withdrawAmountLabel || 'Withdrawal Amount'}
            defaultLabel="Withdrawal Amount"
            inputValue={amount}
            placeholder={withdrawAmountLabel || 'Amount'}
            handleChangeInput={this.handleChangeInputAmount}
          />
          {twoFactorAuthRequired && (
            <CustomInput
              type="number"
              className={s.numberInput}
              label={label2fa}
              placeholder={label2fa}
              defaultLabel="2FA code"
              handleChangeInput={this.handleChangeInputOtpCode}
              inputValue={otpCode}
              handleFocusInput={() => this.handleFieldFocus('code')}
              autoFocus={false}
            />
          )}
        </Box>
        <Box grow row={!isMobileDevice} col={isMobileDevice} spacing="2x">
          <WithdrawSummary total={total} wallet={wallet} />
          <Box selfStart>
            <Button
              variant="primary"
              size="lg"
              onClick={this.handleClick}
              disabled={this.handleCheckButtonDisabled(total, beneficiary, otpCode)}
            >
              {withdrawButtonLabel ? withdrawButtonLabel : 'Withdraw'}
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  private handleCheckButtonDisabled = (
    total: string,
    beneficiary: Beneficiary,
    otpCode: string,
  ) => {
    const isPending = beneficiary.state && beneficiary.state.toLowerCase() === 'pending';

    return Number(total) <= 0 || !Boolean(beneficiary.id) || isPending || !Boolean(otpCode);
  };

  private handleClick = () =>
    this.props.onClick(
      this.state.amount,
      this.state.total,
      this.state.beneficiary,
      this.state.otpCode,
    );

  private handleFieldFocus = (field: string) => {
    switch (field) {
      case 'amount':
        this.setState((prev) => ({
          withdrawAmountFocused: !prev.withdrawAmountFocused,
        }));
        break;
      case 'code':
        this.setState((prev) => ({
          withdrawCodeFocused: !prev.withdrawCodeFocused,
        }));
        break;
      default:
        break;
    }
  };

  private handleChangeInputAmount = (value: string) => {
    const { fixed } = this.props;
    const amount = cleanPositiveFloatInput(value);
    if (amount.match(precisionRegExp(fixed))) {
      const amountMoney = fromDecimalSilent(amount, this.props.currency);
      const totalMoney = amountMoney.subtract(this.props.fee);
      const total = totalMoney.isNegative() ? (0).toFixed(fixed) : totalMoney.toString();
      this.setState({
        total,
        amount,
      });
    }
  };

  private handleChangeBeneficiary = (value: Beneficiary) => {
    this.setState({
      beneficiary: value,
    });
  };

  private handleChangeInputOtpCode = (otpCode: string) => {
    this.setState({ otpCode });
  };
}
