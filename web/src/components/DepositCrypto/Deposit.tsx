import { FC, useMemo } from 'react';
import { Box } from 'src/components/Box';
import { Wallet } from 'web/src/modules/user/wallets/types';
import { WalletHistory } from 'web/src/containers/Wallets/History';
import { getCurrencyCodeSymbol } from 'web/src/helpers/getCurrencySymbol';
import { WalletType } from 'web/src/modules/account/types';
import { useT } from 'web/src/hooks/useT';
import { SelectString } from 'web/src/components/Select/Select';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';
import { DepositExchange } from './DepositExchange';
import { DepositP2P } from './DepositP2P';
import { WalletItemData } from '../WalletItem/WalletItem';
import { DepositWarning } from './DepositWarning';

const OPTIONS: WalletType[] = ['p2p', 'market'];

interface Props {
  general: WalletItemData;
  wallet: Wallet | undefined;
}

export const Deposit: FC<Props> = ({ general, wallet }) => {
  const cryptoCurrency = getCurrencyCodeSymbol(general.currency);
  const isBtc = cryptoCurrency === 'BTC';
  const hasP2P = general.balanceP2P !== undefined;
  const hasMarket = !isBtc && wallet !== undefined;

  const options = useMemo(
    () => OPTIONS.filter((d) => (d === 'market' && hasMarket) || (d === 'p2p' && hasP2P)),
    [hasMarket, hasP2P],
  );

  const [walletType, setWalletType] = useStateWithDeps<WalletType | null>(
    () => (options.length === 1 ? options[0]! : null),
    [options],
  );

  const t = useT();

  return (
    <Box col spacing="5">
      <SelectString
        isSearchable={false}
        options={options}
        value={walletType}
        onChange={setWalletType}
        placeholder={t('Select wallet')}
        formatOptionLabel={(d) => t(d)}
      />
      {walletType === 'market' && <DepositExchange wallet={wallet!} />}
      {walletType === 'p2p' && <DepositP2P currency={cryptoCurrency} />}
      {walletType && (
        <>
          <DepositWarning />
          <WalletHistory defaultTab={walletType} type="deposits" general={general} />
        </>
      )}
    </Box>
  );
};
