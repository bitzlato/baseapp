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
import { useFetchCache } from 'src/hooks/useFetchCache';
import { tradeUrl } from 'src/api/config';
import { Blockchain } from 'src/modules/public/blockchains/types';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import s from 'src/containers/Withdraw/BeneficiaryAddress.postcss';
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
import { useFetch } from 'web/src/hooks/useFetch';

interface Props {
  wallet: Wallet;
}

export const DepositCrypto: FC<Props> = ({ wallet }) => {
  const t = useT();
  const dispatch = useDispatch();
  const history = useHistory();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const user = useSelector(selectUserInfo);
  const memberLevels = useSelector(selectMemberLevels);

  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [retries, setRetries] = useState(0);

  const { data = [] } = useFetchCache<Blockchain[]>(`${tradeUrl()}/public/blockchains`);

  const blockchains = data.filter((d) =>
    wallet.blockchain_currencies.find((b) => b.blockchain_id === d.id),
  );

  useEffect(() => {
    setBlockchain(blockchains.length === 1 ? blockchains[0]! : null);
  }, [blockchains.length, wallet.currency.code]);

  const { data: depositAddress } = useFetch<DepositAddress>(
    `${tradeUrl()}/account/deposit_address/${blockchain?.id ?? ''}`,
    { skipRequest: blockchain === null },
    [retries],
  );

  const isNoAddress = depositAddress?.address === null;

  useEffect(() => {
    if (isNoAddress) {
      window.setTimeout(() => setRetries((d) => d + 1), 2000);
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
      </Box>
    );
  };

  const showMetamask =
    wallet.currency.code === 'ETH' &&
    (!isMobileDevice || isMetaMaskInstalled()) &&
    depositAddress !== undefined;

  return (
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
      <Box col spacing="3" className="cr-deposit-crypto">
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
            <Box row>
              <div className="cr-deposit-info">
                {t('page.body.wallets.tabs.deposit.ccy.message.submit', {
                  confirmations: blockchain.min_confirmations,
                })}
              </div>
              {depositAddress && (
                <div className="d-none d-md-block qr-code-wrapper">
                  <QRCode dimensions={118} data={depositAddress.address} />
                </div>
              )}
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
                className={s.field}
                value={
                  depositAddress?.address ?? t('page.body.wallets.tabs.deposit.ccy.message.pending')
                }
                fieldId={depositAddress?.address ? 'copy_deposit_1' : 'copy_deposit_2'}
                label={t('page.body.wallets.tabs.deposit.ccy.message.address')}
                onCopy={handleCopy}
              />
            </Box>
            <DepositSummary currency={wallet} blockchainCurrency={blockchainCurrency} showWarning />
          </>
        )}
      </Box>
    </Box>
  );
};
