import { FC, useMemo } from 'react';
import { Wallet } from 'web/src/modules/user/wallets';
import { WithdrawMarket } from 'web/src/containers/Withdraw/WithdrawMarket';
import { WithdrawP2P } from 'web/src/containers/Withdraw/WithdrawP2P';
import { useT } from 'web/src/hooks/useT';
import { Box } from 'web/src/components/Box/Box';
import { SelectString } from 'web/src/components/Select/Select';
import { WalletHistory } from 'web/src/containers/Wallets/History';
import { WalletItemData } from 'web/src/components/WalletItem/WalletItem';
import { WalletType } from 'web/src/modules/account/types';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';
import { getCurrencyCodeSymbol } from 'web/src/helpers/getCurrencySymbol';

const WALLET_TYPES: WalletType[] = ['p2p', 'market'];

interface Props {
  general: WalletItemData;
  wallet: Wallet | undefined;
}

export const Withdraw: FC<Props> = ({ general, wallet }) => {
  const t = useT();

  const currencyCode = getCurrencyCodeSymbol(general.currency);
  const isBTC = currencyCode === 'BTC';
  const hasP2P = general.balanceP2P !== undefined;
  const hasMarket = !isBTC && wallet !== undefined;

  const availableWalletTypes = useMemo(() => {
    return WALLET_TYPES.filter((type) => {
      switch (type) {
        case 'p2p':
          return hasP2P;
        case 'market':
          return hasMarket;

        default:
          return true;
      }
    });
  }, [hasP2P, hasMarket]);

  const [walletType, setWalletType] = useStateWithDeps<WalletType | null>(
    () => (availableWalletTypes.length === 1 ? availableWalletTypes[0]! : null),
    [availableWalletTypes],
  );
  const isP2P = walletType === 'p2p';
  const isMarket = walletType === 'market';

  const renderDropItem = (walletTypeValue: string) => {
    return t(walletTypeValue);
  };

  return (
    <>
      <Box position="relative" spacing="3">
        <Box
          flex="1"
          as={SelectString}
          isSearchable={false}
          options={availableWalletTypes}
          value={walletType}
          onChange={setWalletType as any}
          placeholder={t('withdraw.from_balance')}
          label={t('withdraw.from_balance')}
          formatOptionLabel={renderDropItem}
        />

        {isP2P && <WithdrawP2P currencyCode={currencyCode} />}
        {wallet && isMarket && <WithdrawMarket wallet={wallet} />}
      </Box>

      {walletType ? (
        <WalletHistory walletType={walletType} type="withdraws" general={general} />
      ) : null}
    </>
  );
};
