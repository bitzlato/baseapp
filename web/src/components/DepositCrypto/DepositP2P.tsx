import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { Box } from 'src/components/Box';
import { CopyableTextField } from 'src/components/CopyableTextField';
import { QRCode } from 'src/components/QRCode';
import {
  useFetchP2PCurrencies,
  useFetchP2PWallet,
  useGenerateP2PAddress,
} from 'web/src/hooks/data/useFetchP2PWallets';
import { createCcy, createMoney } from 'web/src/helpers/money';
import { DEFAULT_CCY_PRECISION } from 'web/src/constants';
import { WarningIcon } from 'web/src/mobile/assets/images/WarningIcon';
import { Button } from 'web/src/components/ui/Button';
import { SummaryField } from 'web/src/components/SummaryField';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { alertPush } from 'web/src/modules/public/alert/actions';

interface Props {
  currency: string;
}

export const DepositP2P: FC<Props> = ({ currency }) => {
  const t = useT();
  const dispatch = useDispatch();

  const currenciesResp = useFetchP2PCurrencies();
  const walletResp = useFetchP2PWallet(currency);
  const generateAddress = useGenerateP2PAddress();

  const ccy = createCcy(currency, DEFAULT_CCY_PRECISION);
  const currencyData = (currenciesResp.data ?? []).find((d) => d.code === currency);
  const minDepositAmount = createMoney(currencyData?.minAcceptableDeposit ?? 0, ccy);
  const depositAddress = walletResp.data?.address ?? '';
  const isNoAddress = walletResp.data?.address === null;
  const isERC20Crypto = currency === 'ETH' || currency === 'USDT' || currency === 'MDT';
  const textErc20 = currency === 'MDT' ? t('deposit.erc20MDTWarning') : t('deposit.erc20warning');

  const handleClickGenerate = () => {
    generateAddress({ cryptocurrency: currency });
  };

  const handleCopy = () => {
    dispatch(alertPush({ message: ['Successfully copied'], type: 'success' }));
  };

  return (
    <Box col spacing="2">
      <h4>{t('P2P Wallet')}</h4>
      {isNoAddress ? (
        <Button color="secondary" onClick={handleClickGenerate}>
          {t('Generate address')}
        </Button>
      ) : (
        <>
          <Box row spacing="2">
            <span>
              {t('page.body.wallets.tabs.deposit.ccy.message.submit', {
                confirmations: '3 - 5',
              })}
            </span>
            <QRCode dimensions={118} data={depositAddress} />
          </Box>
          <CopyableTextField
            value={depositAddress}
            fieldId="copy_deposit_1"
            label={t('page.body.wallets.tabs.deposit.ccy.message.address')}
            onCopy={handleCopy}
          />
          <Box spacing="2">
            <Box grow col spacing="sm">
              <SummaryField message={t('page.body.wallets.tabs.deposit.ccy.message.fee')}>
                {t('page.body.wallets.tabs.deposit.ccy.message.fee.free')}
              </SummaryField>
              <SummaryField message={t('page.body.wallets.tabs.deposit.ccy.message.minimum')}>
                <AmountFormat money={minDepositAmount} />
              </SummaryField>
            </Box>
            <Box row spacing>
              <WarningIcon />
              <Box textColor="warning" textSize="lg">
                {t('page.body.wallets.tabs.deposit.ccy.message.warning')}
              </Box>
            </Box>
            {isERC20Crypto && (
              <Box row spacing>
                <WarningIcon />
                <Box textColor="warning" textSize="lg">
                  {textErc20}
                </Box>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
