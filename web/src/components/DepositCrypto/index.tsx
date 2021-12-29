import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { isMetaMaskInstalled } from '@bitzlato/ethereum-provider';

import { useT } from 'src/hooks/useT';
import { alertPush, selectMobileDeviceState, Wallet, walletsAddressFetch } from '../../modules';
import { Box } from '../Box';
import { CopyableTextField } from 'src/components/CopyableTextField';
import { MetaMaskButton } from '../MetaMaskButton';
import { QRCode } from '../QRCode';
import { DepositInvoice } from './DepositInvoice';
import { DepositSummary } from './DepositSummary';
import s from 'src/containers/Withdraw/BeneficiaryAddress.postcss';

interface Props {
  wallet: Wallet;
}

export const DepositCrypto: React.FC<Props> = (props) => {
  const { wallet } = props;
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const t = useT();
  const dispatch = useDispatch();

  const handleGenerateAddress = () => {
    const currency = wallet.currency.code.toLowerCase();
    if (currency && !wallet.deposit_address && wallet.type !== 'fiat') {
      dispatch(walletsAddressFetch({ currency }));
      // dispatch(walletsFetch());
    }
  };

  if (!wallet.deposit_address) {
    if (wallet.enable_invoice) {
      return <DepositInvoice currency={wallet} />;
    } else {
      return (
        <Button
          block={true}
          type="button"
          onClick={handleGenerateAddress}
          size="lg"
          variant="primary"
        >
          {t('page.body.wallets.tabs.deposit.ccy.button.generate', {
            currency: wallet.name,
          })}
        </Button>
      );
    }
  }

  const handleOnCopy = () => {
    dispatch(
      alertPush({
        type: 'success',
        message: ['page.body.wallets.tabs.deposit.ccy.message.success'],
      }),
    );
  };

  const walletAddress =
    wallet.deposit_address && wallet.deposit_address.address ? wallet.deposit_address.address : '';

  const text = t('page.body.wallets.tabs.deposit.ccy.message.submit', {
    confirmations: wallet.min_confirmations,
  });

  const disabled = !wallet.deposit_address?.address;
  const onCopy = !disabled ? handleOnCopy : undefined;
  const showMetamask =
    wallet.currency.code === 'ETH' && (!isMobileDevice || isMetaMaskInstalled()) && walletAddress;

  return (
    <Box col spacing="3x" className="cr-deposit-crypto">
      <Box row>
        <div className="cr-deposit-info">{text}</div>
        {walletAddress && (
          <div className="d-none d-md-block qr-code-wrapper">
            <QRCode dimensions={QR_SIZE} data={walletAddress} />
          </div>
        )}
      </Box>
      <Box row spacing="2x">
        {showMetamask ? <MetaMaskButton depositAddress={walletAddress} currency={wallet} /> : null}
        <CopyableTextField
          className={s.field}
          value={walletAddress || t('page.body.wallets.tabs.deposit.ccy.message.pending')}
          fieldId={walletAddress ? 'copy_deposit_1' : 'copy_deposit_2'}
          disabled={disabled}
          label={t('page.body.wallets.tabs.deposit.ccy.message.address')}
          onCopy={onCopy}
        />
      </Box>
      <DepositSummary currency={wallet} showWarning />
    </Box>
  );
};

const QR_SIZE = 118;
