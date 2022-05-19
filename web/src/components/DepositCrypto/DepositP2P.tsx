import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { Box } from 'src/components/Box';
import {
  useFetchP2PCryptoCurrencies,
  useFetchP2PWallet,
  useGenerateP2PAddress,
} from 'web/src/hooks/data/useFetchP2PWallets';
import { createCcy, createMoney } from 'web/src/helpers/money';
import { DEFAULT_CCY_PRECISION } from 'web/src/constants';
import { WarningIcon } from 'web/src/mobile/assets/images/WarningIcon';
import { Button } from 'web/src/components/ui/Button';
import { SummaryField } from 'web/src/components/SummaryField';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { WalletAddress } from 'web/src/components/WalletAddress/WalletAddress';
import { alertPush } from 'web/src/modules/public/alert/actions';

interface Props {
  currency: string;
}

export const DepositP2P: FC<Props> = ({ currency }) => {
  const t = useT();
  const dispatch = useDispatch();

  const currenciesResp = useFetchP2PCryptoCurrencies();
  const walletResp = useFetchP2PWallet(currency);
  const generateAddress = useGenerateP2PAddress();

  const ccy = createCcy(currency, DEFAULT_CCY_PRECISION);
  const currencyData = (currenciesResp.data ?? []).find((d) => d.code === currency);
  const minDepositAmount = createMoney(currencyData?.minAcceptableDeposit ?? 0, ccy);
  const depositAddress = walletResp.data?.address ?? '';
  const isNoAddress = walletResp.data?.address === null;
  const isERC20Crypto = currency === 'ETH' || currency === 'USDT' || currency === 'MDT';
  const isMDT = currency === 'MDT';

  const handleClickGenerate = () => {
    generateAddress({ cryptocurrency: currency });
  };

  const handleCopy = () => {
    dispatch(alertPush({ message: ['Successfully copied'], type: 'success' }));
  };

  return isNoAddress ? (
    <Box row justify="end">
      <Button color="secondary" onClick={handleClickGenerate}>
        {t('Generate address')}
      </Button>
    </Box>
  ) : (
    <Box col spacing="2">
      <Box col spacing="3">
        <span>
          {t('page.body.wallets.tabs.deposit.ccy.message.submit', {
            confirmations: '3 - 5',
          })}
        </span>
        <WalletAddress
          value={depositAddress}
          fieldId="copy_deposit_p2p"
          label={t('page.body.wallets.tabs.deposit.ccy.message.address')}
          onCopy={handleCopy}
        />
      </Box>
      <Box grow col spacing="sm">
        <SummaryField message={t('page.body.wallets.tabs.deposit.ccy.message.fee')}>
          {t('page.body.wallets.tabs.deposit.ccy.message.fee.free')}
        </SummaryField>
        <SummaryField message={t('page.body.wallets.tabs.deposit.ccy.message.minimum')}>
          <AmountFormat money={minDepositAmount} />
        </SummaryField>
      </Box>
      {isERC20Crypto && (
        <Box row spacing>
          <WarningIcon />
          <Box textColor="warning" textSize="lg">
            {isMDT ? t('deposit.erc20MDTWarning') : t('deposit.erc20warning')}
          </Box>
        </Box>
      )}
    </Box>
  );
};
