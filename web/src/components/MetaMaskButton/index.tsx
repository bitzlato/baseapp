import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import BN from 'bignumber.js';
import MetaMaskOnboarding from '@metamask/onboarding';
import {
  getMetaMaskProvider,
  HexString,
  ProviderRpcError,
  ChainId,
} from '@bitzlato/ethereum-provider';

import { useT } from 'src/hooks/useT';
import { createMoney } from 'src/helpers/money';
import s from 'src/containers/Withdraw/Withdraw.postcss';
import { MetaMaskLogo } from '../../assets/images/MetaMaskLogo';
import { alertPush, ApiCurrency } from '../../modules';
import { CustomInput } from '../CustomInput';

interface Props {
  depositAddress: string;
  currency: ApiCurrency;
}

export const MetaMaskButton: React.FC<Props> = (props) => {
  const t = useT();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [isAmountValid, setAmountValid] = React.useState(false);

  const close = () => {
    setOpen(false);
  };

  const open = async () => {
    const provider = getMetaMaskProvider();
    if (provider) {
      try {
        const chainId = await provider.request({ method: 'eth_chainId' });
        if (isEqualChains(chainId, props.currency)) {
          setOpen(true);
        } else {
          dispatch(alertPush({ message: ['metamask.error.unsupportedNetwork'], type: 'error' }));
        }
      } catch (e) {
        dispatch(alertPush({ message: [(e as ProviderRpcError).message], type: 'error' }));
      }
    } else {
      new MetaMaskOnboarding().startOnboarding();
    }
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
      } catch (e) {
        dispatch(alertPush({ message: [(e as ProviderRpcError).message], type: 'error' }));
      }
      close();
    }
  };

  const handleChangeAmount = (value: string) => {
    setAmount(value);
    try {
      setAmountValid(createMoney(value, props.currency).gte(props.currency.min_deposit_amount));
    } catch (error) {
      setAmountValid(false);
    }
  };

  return (
    <>
      <MetaMaskLogo
        title={t('page.body.wallets.deposits.metamask')}
        className="pg-metamask"
        onClick={open}
      />
      {isOpen && (
        <div className="expired-session-modal">
          <div className="cr-modal">
            <div className="cr-email-form">
              <div className="cr-email-form__options-group">
                <div className="cr-email-form__option">
                  <div className="cr-email-form__option-inner">
                    {t('page.body.wallets.deposits.addDepositModal.header')}
                    <span className="cr-email-form__close" onClick={close} />
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
                    autoFocus
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

function isEqualChains(chainId: HexString, currency: ApiCurrency): boolean {
  const address = currency.explorer_address;
  return (
    (chainId === ChainId.Mainnet && address.startsWith('https://etherscan.io/')) ||
    (chainId === ChainId.Ropsten && address.startsWith('https://ropsten.etherscan.io/'))
  );
}
