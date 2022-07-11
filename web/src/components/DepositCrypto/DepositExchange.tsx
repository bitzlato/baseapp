import { FC, ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { isMetaMaskInstalled } from '@bitzlato/ethereum-provider';

import { useT } from 'src/hooks/useT';
import { Box } from 'src/components/Box';
import { Select } from 'src/components/Select/Select';
import { MetaMaskButton } from 'src/components/MetaMaskButton';
import { Blur } from 'src/components/Blur';
import { tradeUrl } from 'src/api/config';
import { Blockchain } from 'src/modules/public/blockchains/types';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetchBlockchains } from 'web/src/hooks/data/belomor/useFetchBlockchains';
import { DepositSummary } from './DepositSummary';
import {
  DepositAddress,
  selectMemberLevels,
  selectMobileDeviceState,
  selectUserInfo,
  Wallet,
} from '../../modules';
import { CryptoCurrencyIcon } from '../ui/CryptoCurrencyIcon';
import { WalletAddress } from '../WalletAddress/WalletAddress';

function isUSDXe(blockchainName: string, currency: string): boolean {
  return blockchainName === 'Avalanche' && (currency === 'USDT' || currency === 'USDC');
}

interface Props {
  wallet: Wallet;
}

export const DepositExchange: FC<Props> = ({ wallet }) => {
  const currency = getCurrencyCodeSymbol(wallet.currency.code);

  const t = useT();
  const history = useHistory();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const user = useSelector(selectUserInfo);
  const memberLevels = useSelector(selectMemberLevels);

  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);

  const blockchainsResponse = useFetchBlockchains();

  const blockchains = (blockchainsResponse.data ?? []).filter((d) =>
    wallet.blockchain_currencies.find((b) => b.blockchain_id === d.id),
  );

  useEffect(() => {
    setBlockchain(blockchains.length === 1 ? blockchains[0]! : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNoAddress]);

  const blockchainCurrency = wallet.blockchain_currencies.find(
    (d) => d.blockchain_id === blockchain?.id,
  );

  const renderSelectItem = (value: Blockchain) => {
    return (
      <Box row spacing>
        <CryptoCurrencyIcon size="6x" currency={getCurrencyCodeSymbol(value.key)} />
        <span>{value.name}</span>
        {isUSDXe(value.name, currency) ? <span> {`(${currency}.e)`}</span> : null}
      </Box>
    );
  };

  const showMetamask =
    currency === 'ETH' &&
    (!isMobileDevice || isMetaMaskInstalled()) &&
    depositAddress !== undefined;

  let blur: ReactNode;
  if (!wallet?.deposit_enabled) {
    blur = <Blur text={t('page.body.wallets.tabs.deposit.disabled.message')} />;
  } else if (user.level < (memberLevels?.deposit.minimum_level ?? 0)) {
    blur = (
      <Blur
        text={t('page.body.wallets.warning.deposit.verification')}
        onClick={() => history.push('/confirm')}
        linkText={t('page.body.wallets.warning.deposit.verification.button')}
      />
    );
  }

  return (
    <Box position="relative">
      {blur}
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
            <Box col spacing="3">
              <span>
                {t('page.body.wallets.tabs.deposit.ccy.message.submit', {
                  confirmations: blockchain.min_confirmations,
                })}
              </span>
              <Box row spacing="2">
                {showMetamask && blockchain && typeof blockchain.explorer_address === 'string' ? (
                  <MetaMaskButton
                    depositAddress={depositAddress.address}
                    explorerAddress={blockchain.explorer_address}
                    currency={wallet}
                    blockchainCurrency={blockchainCurrency}
                  />
                ) : null}
                <Box
                  grow
                  as={WalletAddress}
                  value={depositAddress.address}
                  fieldId="copy_deposit_exchange"
                  label={t('page.body.wallets.tabs.deposit.ccy.message.address')}
                />
              </Box>
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
  );
};
