import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isMetaMaskInstalled } from '@bitzlato/ethereum-provider';

import { useT } from 'src/hooks/useT';
import { Box } from 'src/components/Box';
import { CopyableTextField } from 'src/components/CopyableTextField';
import { Select } from 'src/components/Select/Select';
import { MetaMaskButton } from 'src/components/MetaMaskButton';
import { QRCode } from 'src/components/QRCode';
import { Blur } from 'src/components/Blur';
import { tradeUrl } from 'src/api/config';
import { Blockchain } from 'src/modules/public/blockchains/types';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import { DepositSummary } from './DepositSummary';
import {
  alertPush,
  DepositAddress,
  selectMemberLevels,
  selectMobileDeviceState,
  selectUserInfo,
  Wallet,
} from '../../modules';
import { CryptoCurrencyIcon } from '../CryptoCurrencyIcon/CryptoCurrencyIcon';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { fetchWithCreds } from 'web/src/helpers/fetch';

interface Props {
  wallet: Wallet;
}

export const DepositCrypto: FC<Props> = ({ wallet }) => {
  const currency = getCurrencyCodeSymbol(wallet.currency.code);

  const t = useT();
  const dispatch = useDispatch();
  const history = useHistory();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const user = useSelector(selectUserInfo);
  const memberLevels = useSelector(selectMemberLevels);

  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);

  const blockchainsResponse = useFetch<Blockchain[]>(`${tradeUrl()}/public/blockchains`);

  const blockchains = (blockchainsResponse.data ?? []).filter((d) =>
    wallet.blockchain_currencies.find((b) => b.blockchain_id === d.id),
  );

  useEffect(() => {
    setBlockchain(blockchains.length === 1 ? blockchains[0]! : null);
  }, [blockchains.length, currency]);

  const depositResponse = useFetch<DepositAddress>(
    blockchain?.id ? `${tradeUrl()}/account/deposit_address/${blockchain.id}` : null,
    fetchWithCreds,
  );

  const depositAddress = depositResponse.data;
  const isNoAddress = depositAddress?.address === null;

  useEffect(() => {
    if (isNoAddress) {
      window.setTimeout(() => depositResponse.mutate(), 2000);
    }
  }, [isNoAddress]);

  const blockchainCurrency = wallet.blockchain_currencies.find(
    (d) => d.blockchain_id === blockchain?.id,
  );

  const handleCopy = () => {
    dispatch(
      alertPush({
        type: 'success',
        message: ['page.body.wallets.tabs.deposit.ccy.message.success'],
      }),
    );
  };

  const renderSelectItem = (value: Blockchain) => {
    return (
      <Box row spacing>
        <CryptoCurrencyIcon size="small" currency={getCurrencyCodeSymbol(value.key)} />
        <span>{value.name}</span>
        {isUSDXe(value.name, currency) ? <span> {`(${currency}.e)`}</span> : null}
      </Box>
    );
  };

  const showMetamask =
    currency === 'ETH' &&
    (!isMobileDevice || isMetaMaskInstalled()) &&
    depositAddress !== undefined;

  return (
    <Box col spacing="2">
      <h4>{t('Exchange Wallet')}</h4>
      <Box position="relative">
        {!wallet?.deposit_enabled ? (
          <Blur text={t('page.body.wallets.tabs.deposit.disabled.message')} />
        ) : user.level < (memberLevels?.deposit.minimum_level ?? 0) ? (
          <Blur
            text={t('page.body.wallets.warning.deposit.verification')}
            onClick={() => history.push('/confirm')}
            linkText={t('page.body.wallets.warning.deposit.verification.button')}
          />
        ) : null}
        <Box col spacing="2">
          <Select
            options={blockchains}
            value={blockchain}
            onChange={setBlockchain}
            placeholder={t('Select network')}
            label={t('Network')}
            formatOptionLabel={renderSelectItem}
            getOptionValue={(d) => d.key}
          />
          {blockchain && depositAddress?.address && blockchainCurrency && (
            <>
              <Box row spacing="2">
                <span>
                  {t('page.body.wallets.tabs.deposit.ccy.message.submit', {
                    confirmations: blockchain.min_confirmations,
                  })}
                </span>
                <QRCode dimensions={118} data={depositAddress.address} />
              </Box>
              <Box row spacing="2">
                {showMetamask ? (
                  <MetaMaskButton
                    depositAddress={depositAddress.address}
                    explorerAddress={blockchain.explorer_address}
                    currency={wallet}
                    blockchainCurrency={blockchainCurrency}
                  />
                ) : null}
                <CopyableTextField
                  value={depositAddress.address}
                  fieldId="copy_deposit_1"
                  label={t('page.body.wallets.tabs.deposit.ccy.message.address')}
                  onCopy={handleCopy}
                />
              </Box>
              <DepositSummary
                wallet={wallet}
                blockchainCurrency={blockchainCurrency}
                isUSDXe={isUSDXe(blockchain.name, currency)}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

function isUSDXe(blockchainName: string, currency: string): boolean {
  return blockchainName === 'Avalanche' && (currency === 'USDT' || currency === 'USDC');
}
