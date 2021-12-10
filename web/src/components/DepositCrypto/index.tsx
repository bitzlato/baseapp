import cn from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { isMetaMaskInstalled } from '@bitzlato/ethereum-provider';

import { useT } from 'src/hooks/useT';
import { formatCCYAddress } from '../../helpers';
import { ApiCurrency, selectMobileDeviceState, Wallet } from '../../modules';
import { Box } from '../Box';
import { CopyableTextField } from 'src/components/CopyableTextField';
import { MetaMaskButton } from '../MetaMaskButton';
import { QRCode } from '../QRCode';
import { DepositInvoice } from './DepositInvoice';
import { DepositSummary } from './DepositSummary';
import s from 'src/containers/Withdraw/BeneficiaryAddress.postcss';

export interface DepositCryptoProps {
  /**
   * Wallet
   */
  wallet: Wallet;
  /**
   * Data which is used to display error if data is undefined
   */
  error: string;
  /**
   * Defines the size of QR code component.
   * @default 118
   */
  dimensions?: number;
  /**
   * @default 'Deposit by Wallet Address'
   * Renders text of the label of CopyableTextField component
   */
  copiableTextFieldText?: string;
  /**
   * Renders text alert about success copy address
   */
  handleOnCopy: () => void;
  /**
   * Generate wallet address for selected wallet
   */
  handleGenerateAddress: () => void;
  disabled?: boolean;
  currency: ApiCurrency;
}

/**
 *  Component that displays wallet details that can be used to deposit cryptocurrency.
 */
export const DepositCrypto: React.FC<DepositCryptoProps> = (props) => {
  const QR_SIZE = 118;
  const {
    copiableTextFieldText,
    dimensions,
    error,
    handleGenerateAddress,
    handleOnCopy,
    wallet,
    currency,
  } = props;
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const t = useT();

  if (!wallet.deposit_address) {
    if (wallet.enable_invoice) {
      return <DepositInvoice currency={currency} />;
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

  const walletAddress =
    wallet.deposit_address && wallet.deposit_address.address
      ? formatCCYAddress(wallet.currency.code, wallet.deposit_address.address)
      : '';

  const text = t('page.body.wallets.tabs.deposit.ccy.message.submit', {
    confirmations: currency.min_confirmations,
  });

  const size = dimensions || QR_SIZE;
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
            <QRCode dimensions={size} data={walletAddress} />
          </div>
        )}
      </Box>
      <Box row spacing="2x">
        {showMetamask ? (
          <MetaMaskButton depositAddress={walletAddress} currency={currency} />
        ) : null}
        <CopyableTextField
          className={s.field}
          value={walletAddress || error}
          fieldId={walletAddress ? 'copy_deposit_1' : 'copy_deposit_2'}
          disabled={disabled}
          label={copiableTextFieldText ?? 'Deposit by Wallet Address'}
          onCopy={onCopy}
        />
      </Box>
      <DepositSummary currency={currency} showWarning />
    </Box>
  );
};
