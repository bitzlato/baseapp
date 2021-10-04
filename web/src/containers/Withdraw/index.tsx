import classnames from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { ccy } from 'src/components/MoneyFormat/MoneyFormat';
import { Beneficiaries, CustomInput } from '../../components';
import { cleanPositiveFloatInput, precisionRegExp } from '../../helpers';
import { Beneficiary, Currency } from '../../modules';
import { WithdrawSummary } from './WithdrawSummary';

export interface WithdrawProps {
  currency: string;
  fee: number;
  onClick: (amount: string, total: string, beneficiary: Beneficiary, otpCode: string) => void;
  fixed: number;
  className?: string;
  type: 'fiat' | 'coin';
  enableInvoice?: boolean;
  twoFactorAuthRequired?: boolean;
  withdrawAmountLabel?: string;
  withdraw2faLabel?: string;
  withdrawButtonLabel?: string;
  withdrawDone: boolean;
  isMobileDevice?: boolean;
  ccyInfo: Currency;
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

  public componentWillReceiveProps(nextProps) {
    const { currency, withdrawDone } = this.props;

    if (
      (nextProps && JSON.stringify(nextProps.currency) !== JSON.stringify(currency)) ||
      (nextProps.withdrawDone && !withdrawDone)
    ) {
      this.setState({
        amount: '',
        otpCode: '',
        total: '',
      });
    }
  }

  public render() {
    const { amount, beneficiary, total, withdrawAmountFocused, otpCode } = this.state;
    const {
      className,
      currency,
      type,
      enableInvoice,
      twoFactorAuthRequired,
      withdrawAmountLabel,
      withdrawButtonLabel,
      isMobileDevice,
      fixed,
      ccyInfo,
    } = this.props;

    const cx = classnames('cr-withdraw', className);
    const lastDividerClassName = classnames('cr-withdraw__divider', {
      'cr-withdraw__divider-one': twoFactorAuthRequired,
      'cr-withdraw__divider-two': !twoFactorAuthRequired,
    });

    const withdrawAmountClass = classnames('cr-withdraw__group__amount', {
      'cr-withdraw__group__amount--focused': withdrawAmountFocused,
    });

    const mccy = ccy(currency, fixed);

    return (
      <div className={cx}>
        <div className="cr-withdraw-column">
          <div className="cr-withdraw__group__address">
            <Beneficiaries
              currency={currency}
              type={type}
              enableInvoice={enableInvoice}
              onChangeValue={this.handleChangeBeneficiary}
            />
          </div>
          <div className="cr-withdraw__divider cr-withdraw__divider-one" />
          <div className={withdrawAmountClass}>
            <CustomInput
              type="number"
              label={withdrawAmountLabel || 'Withdrawal Amount'}
              defaultLabel="Withdrawal Amount"
              inputValue={amount}
              placeholder={withdrawAmountLabel || 'Amount'}
              classNameInput="cr-withdraw__input"
              handleChangeInput={this.handleChangeInputAmount}
            />
          </div>
          <div className={lastDividerClassName} />
          {!isMobileDevice && twoFactorAuthRequired && this.renderOtpCodeInput()}
        </div>
        <div className="cr-withdraw-column cr-row-spacing-2x">
          <WithdrawSummary total={total} currency={ccyInfo} />
          {isMobileDevice && twoFactorAuthRequired && this.renderOtpCodeInput()}
          <Button
            className="cr-self-start"
            variant="primary"
            size="lg"
            onClick={this.handleClick}
            disabled={this.handleCheckButtonDisabled(total, beneficiary, otpCode)}
          >
            {withdrawButtonLabel ? withdrawButtonLabel : 'Withdraw'}
          </Button>
        </div>
      </div>
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

  private renderOtpCodeInput = () => {
    const { otpCode, withdrawCodeFocused } = this.state;
    const { withdraw2faLabel } = this.props;
    const withdrawCodeClass = classnames('cr-withdraw__group__code', {
      'cr-withdraw__group__code--focused': withdrawCodeFocused,
    });

    return (
      <React.Fragment>
        <div className={withdrawCodeClass}>
          <CustomInput
            type="number"
            label={withdraw2faLabel || '2FA code'}
            placeholder={withdraw2faLabel || '2FA code'}
            defaultLabel="2FA code"
            handleChangeInput={this.handleChangeInputOtpCode}
            inputValue={otpCode}
            handleFocusInput={() => this.handleFieldFocus('code')}
            classNameLabel="cr-withdraw__label"
            classNameInput="cr-withdraw__input"
            autoFocus={false}
          />
        </div>
        <div className="cr-withdraw__divider cr-withdraw__divider-two" />
      </React.Fragment>
    );
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
    const convertedValue = cleanPositiveFloatInput(String(value));

    if (convertedValue.match(precisionRegExp(fixed))) {
      const amount = convertedValue !== '' ? Number(parseFloat(convertedValue).toFixed(fixed)) : '';
      const total = amount !== '' ? (amount - this.props.fee).toFixed(fixed) : '';

      if (Number(total) <= 0) {
        this.setTotal((0).toFixed(fixed));
      } else {
        this.setTotal(total);
      }

      this.setState({
        amount: convertedValue,
      });
    }
  };

  private setTotal = (value: string) => {
    this.setState({ total: value });
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
