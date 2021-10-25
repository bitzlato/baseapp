import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useT } from 'src/hooks/useT';
import {
  Currency,
  depositsCreate,
  selectDepositsCreateLoading,
  selectDepositsCreateSuccess,
  selectMobileDeviceState,
} from '../../modules';
import { Box } from '../Box';
import { CustomInput } from '../CustomInput';
import { DepositSummary } from './DepositSummary';
import s from 'src/containers/Withdraw/Withdraw.postcss';
import { useHistory } from 'react-router';
import { Money } from '@trzmaxim/money';

interface Props {
  currency: Currency;
}

export const DepositInvoice: React.FC<Props> = ({ currency }) => {
  const [amount, setAmount] = React.useState('');
  const [amountValid, setAmountValid] = React.useState(false);

  const t = useT();
  const dispatch = useDispatch();
  const isMobile = useSelector(selectMobileDeviceState);
  const history = useHistory();

  const isDepositCreateLoading = useSelector(selectDepositsCreateLoading);
  const isDepositCreateSuccess = useSelector(selectDepositsCreateSuccess);

  const handleSubmit = () => {
    dispatch(
      depositsCreate({
        currency: currency.id,
        amount: amount,
      }),
    );
    setAmount('');
    if (isMobile) {
      history.push(`/wallets/${currency.id}/history`);
    }
  };

  const handleChangeAmount = (value: string) => {
    setAmount(value);
    setAmountValid(Money.fromDecimal(value, currency).gt(currency.min_deposit_amount));
  };

  const isDisabled = !amount || !amountValid || isDepositCreateLoading || isDepositCreateSuccess;

  return (
    <Box col spacing="2x">
      <CustomInput
        type="number"
        label={t('page.body.wallets.deposits.addDepositModal.amount')}
        placeholder={t('page.body.wallets.deposits.addDepositModal.amount')}
        defaultLabel="Amount"
        handleChangeInput={handleChangeAmount}
        inputValue={amount}
        className={s.numberInput}
        autoFocus={true}
      />
      <Box grow row={!isMobile} col={isMobile} spacing="2x">
        <DepositSummary currency={currency} />
        <Button disabled={isDisabled} onClick={handleSubmit} size="lg" variant="primary">
          {t('page.body.wallets.tabs.deposit.ccy.button.create')}
        </Button>
      </Box>
    </Box>
  );
};
