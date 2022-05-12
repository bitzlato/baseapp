import * as React from 'react';
import { WarningIcon } from 'src/mobile/assets/images/WarningIcon';
import { useT } from 'src/hooks/useT';
import { SummaryField } from 'src/components/SummaryField';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { BlockchainCurrencyMoney } from 'src/modules/public/currencies/types';
import { Box } from 'src/components/Box';
import { Wallet } from 'web/src/modules/user/wallets/types';

interface Props {
  wallet: Wallet;
  blockchainCurrency: BlockchainCurrencyMoney;
  isUSDXe: boolean;
}

export const DepositSummary: React.FC<Props> = ({ wallet, blockchainCurrency, isUSDXe }) => {
  const t = useT();

  return (
    <Box spacing="2">
      <Box grow col spacing="sm">
        <SummaryField message={t('page.body.wallets.tabs.deposit.ccy.message.fee')}>
          {wallet.deposit_fee.isZero() ? (
            t('page.body.wallets.tabs.deposit.ccy.message.fee.free')
          ) : (
            <AmountFormat money={wallet.deposit_fee} />
          )}
        </SummaryField>
        <SummaryField message={t('page.body.wallets.tabs.deposit.ccy.message.minimum')}>
          <AmountFormat money={blockchainCurrency.min_deposit_amount} />
        </SummaryField>
      </Box>
      {isUSDXe ? (
        <Box row spacing>
          <WarningIcon />
          <Box textColor="warning" textSize="lg">
            {t('deposit.usdx.e', { currency: <strong>{`${wallet.currency.code}.e`}</strong> })}
          </Box>
        </Box>
      ) : null}
      {process.env.REACT_APP_RELEASE_STAGE === 'sandbox' && (
        <span>
          <span>You can top up your balance by address </span>
          {wallet.id === 'eth' && (
            <a href="https://faucet.ropsten.be/" target="_blank" rel="noopener noreferrer">
              faucet.ropsten.be/
            </a>
          )}
          {wallet.id === 'bnb' && (
            <a
              href="https://testnet.binance.org/faucet-smart"
              target="_blank"
              rel="noopener noreferrer"
            >
              testnet.binance.org/faucet-smart
            </a>
          )}
        </span>
      )}
    </Box>
  );
};
