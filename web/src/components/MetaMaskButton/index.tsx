import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import BN from 'bignumber.js';
import { Money } from '@bitzlato/money-js';
import { getMetaMaskProvider, HexString, ProviderRpcError } from '@bitzlato/ethereum-provider';
import MetaMaskOnboarding from '@metamask/onboarding';

import { MetaMaskLogo } from '../../assets/images/MetaMaskLogo';
import { alertPush, Currency } from '../../modules';
import { useT } from 'src/hooks/useT';
import { CustomInput } from '../CustomInput';

import s from 'src/containers/Withdraw/Withdraw.postcss';

interface Props {
  depositAddress: string;
  currency: Currency;
}

export const MetaMaskButton: React.FC<Props> = (props) => {
  const t = useT();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [isAmountValid, setAmountValid] = React.useState(false);

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  const handleSubmit = async () => {
    const provider = getMetaMaskProvider();
    if (provider) {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        await provider.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              to: props.depositAddress,
              value: toWei(amount),
            },
          ],
        });
        toggleModal();
      } catch (e) {
        dispatch(alertPush({ message: [(e as ProviderRpcError).message], type: 'error' }));
      }
    } else {
      new MetaMaskOnboarding().startOnboarding();
    }
  };

  const handleChangeAmount = (value: string) => {
    setAmount(value);
    try {
      setAmountValid(
        Money.fromDecimal(value, props.currency).gte(props.currency.min_deposit_amount),
      );
    } catch (error) {
      setAmountValid(false);
    }
  };

  return (
    <>
      <MetaMaskLogo
        title={t('page.body.wallets.deposits.metamask')}
        className="pg-metamask"
        onClick={toggleModal}
      />
      {isOpen && (
        <div className="expired-session-modal">
          <div className="cr-modal">
            <div className="cr-email-form">
              <div className="cr-email-form__options-group">
                <div className="cr-email-form__option">
                  <div className="cr-email-form__option-inner">
                    {t('page.body.wallets.deposits.addDepositModal.header')}
                    <span className="cr-email-form__close" onClick={toggleModal} />
                  </div>
                </div>
              </div>
              <div className="cr-email-form__form-content">
                <div className="cr-email-form__group">
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
                </div>
                <div className="cr-email-form__button-wrapper">
                  <Button
                    disabled={!isAmountValid}
                    onClick={handleSubmit}
                    size="lg"
                    variant="primary"
                  >
                    {t('page.body.wallets.deposits.addDepositModal.body.button')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function toWei(amount: string): HexString {
  return new BN(amount).multipliedBy(1e18).toString(16);
}
