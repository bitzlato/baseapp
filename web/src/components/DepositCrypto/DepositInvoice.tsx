import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useT } from 'src/hooks/useT';
import s from 'src/containers/Withdraw/Withdraw.postcss';
import { useHistory } from 'react-router';
import { createMoney } from 'src/helpers/money';
import {
  ApiCurrency,
  depositsCreate,
  selectDepositsCreateLoading,
  selectMobileDeviceState,
} from '../../modules';
import { Box } from '../Box';
import { CustomInput } from '../CustomInput';
import { DepositSummary } from './DepositSummary';

interface Props {
  currency: ApiCurrency;
}

export const DepositInvoice: React.FC<Props> = ({ currency }) => {
  const [amount, setAmount] = React.useState('');
  const [amountValid, setAmountValid] = React.useState(false);

  const t = useT();
  const dispatch = useDispatch();
  const isMobile = useSelector(selectMobileDeviceState);
  const history = useHistory();

  const isDepositCreateLoading = useSelector(selectDepositsCreateLoading);

  const handleSubmit = () => {
    dispatch(
      depositsCreate({
        currency: currency.id,
        amount,
      }),
    );
    handleChangeAmount('');
    if (isMobile) {
      history.push(`/wallets/${currency.id}/history`);
    }
  };

  const handleChangeAmount = (value: string) => {
    setAmount(value);
    setAmountValid(createMoney(value, currency).gte(currency.min_deposit_amount));
  };

  const isDisabled = !amountValid || isDepositCreateLoading;

  return (
    <Box col spacing="2">
      <CustomInput
        type="number"
        label={t('page.body.wallets.deposits.addDepositModal.amount')}
        placeholder={t('page.body.wallets.deposits.addDepositModal.amount')}
        defaultLabel="Amount"
        handleChangeInput={handleChangeAmount}
        inputValue={amount}
        className={s.numberInput}
        autoFocus
      />
      <Box grow row={!isMobile} col={isMobile} spacing="2">
        <DepositSummary currency={currency} />
        <Button disabled={isDisabled} onClick={handleSubmit} size="lg" variant="primary">
          {t('page.body.wallets.tabs.deposit.ccy.button.create')}
        </Button>
      </Box>
    </Box>
  );
};
