import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { Box } from 'src/components/Box';
import {
  useFetchP2PWallet,
  useFetchP2PWalletStat,
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
import { useFetchP2PCryptoCurrencies } from 'web/src/hooks/data/p2p/useFetchP2PCryptoCurrencies';
import { P2PBlockchain } from 'web/src/modules/public/blockchains/types';
import { Select } from 'src/components/Select/Select';
import { Spinner } from 'web/src/components/ui/Spinner';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { useFeatureEnabled } from 'web/src/hooks/useFeatureEnabled';

interface Props {
  currency: string;
}

const getOptionValue = <T extends P2PBlockchain>(option: T) => option.id.toString();

export const DepositP2P: FC<Props> = ({ currency }) => {
  const blockchainsChoiceEnabled = useFeatureEnabled('p2p_blockchains_choice');
  const t = useT();
  const dispatch = useDispatch();

  const { data: p2pWalletsStat } = useFetchP2PWalletStat();

  const [blockchain, setBlockchain] = useState<P2PBlockchain | null>(null);

  const currenciesResp = useFetchP2PCryptoCurrencies();
  const walletResp = useFetchP2PWallet(currency, blockchain ?? undefined);
  const generateAddress = useGenerateP2PAddress();

  const walletStat = p2pWalletsStat?.find((wallet) => wallet.code === currency);
  const ccy = createCcy(currency, DEFAULT_CCY_PRECISION);
  const currencyData = blockchain ?? (currenciesResp.data ?? []).find((d) => d.code === currency);
  const minDepositAmount = createMoney(currencyData?.minAcceptableDeposit ?? 0, ccy);
  const depositAddress = walletResp.data?.address ?? '';
  const blockchains = walletStat?.blockchains;
  const hasBlockchains = blockchains && blockchains?.length > 0;
  const blockchainsEnabled = hasBlockchains && blockchainsChoiceEnabled;
  const isNoAddress = walletResp.data?.address === null || !walletResp.data;
  const isERC20Crypto = currency === 'ETH' || currency === 'USDT' || currency === 'MDT';
  const isMDT = currency === 'MDT';

  useEffect(() => {
    if (blockchainsEnabled) {
      setBlockchain(walletStat?.blockchains?.length === 1 ? walletStat.blockchains[0]! : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockchainsEnabled, blockchains?.length, currency]);

  const handleClickGenerate = () => {
    generateAddress({
      cryptocurrency: currency,
      blockchainId: blockchain ? blockchain.id : undefined,
    });
  };

  const handleCopy = () => {
    dispatch(alertPush({ message: ['Successfully copied'], type: 'success' }));
  };

  const renderSelectItem = (value: P2PBlockchain) => {
    return (
      <Box row spacing>
        <CryptoCurrencyIcon size="6x" currency={value.key.replace('p2p-', '').split('-')[0]!} />
        <span>{value.name}</span>
      </Box>
    );
  };

  if (!p2pWalletsStat) {
    return (
      <Box row justify="center">
        <Spinner size="16x" />
      </Box>
    );
  }

  let body;
  if (blockchainsEnabled && !blockchain) {
    body = null;
  } else if (isNoAddress) {
    body = (
      <Box col spacing="2">
        <Box row justify="end">
          <Button color="secondary" onClick={handleClickGenerate}>
            {t('Generate address')}
          </Button>
        </Box>
      </Box>
    );
  } else {
    body = (
      <>
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
      </>
    );
  }

  return (
    <Box col spacing="2">
      {blockchainsEnabled && (
        <Select
          options={blockchains}
          value={blockchain}
          onChange={setBlockchain}
          placeholder={t('Select network')}
          label={t('Network')}
          formatOptionLabel={renderSelectItem}
          getOptionValue={getOptionValue}
        />
      )}

      {body}
    </Box>
  );
};
