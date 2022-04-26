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

const OPTIONS: WalletType[] = ['market', 'p2p'];

interface Props {
  general: WalletItemData;
  wallet: Wallet | undefined;
}

export const Deposit: FC<Props> = ({ general, wallet }) => {
  const cryptoCurrency = getCurrencyCodeSymbol(general.currency);
  const isBtc = cryptoCurrency === 'BTC';
  const hasP2P = !!general.balanceP2P;
  const hasMarket = !isBtc && !!wallet;

  const options = useMemo(
    () => OPTIONS.filter((d) => (d === 'market' && hasMarket) || (d === 'p2p' && hasP2P)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cryptoCurrency],
  );

  const [account, setAccount] = useStateWithDeps<WalletType | null>(
    () => (options.length === 1 ? options[0]! : null),
    [options],
  );

  const t = useT();

  return (
    <Box col spacing="5">
      <SelectString
        isSearchable={false}
        options={options}
        value={account}
        onChange={setAccount}
        placeholder={t('Select wallet')}
        formatOptionLabel={(d) => t(d)}
      />
      {account === 'market' && <DepositExchange wallet={wallet!} />}
      {account === 'p2p' && <DepositP2P currency={cryptoCurrency} />}
      {account && (
        <>
          <DepositWarning />
          <WalletHistory defaultTab={account} type="deposits" general={general} />
        </>
      )}
    </Box>
  );
};
