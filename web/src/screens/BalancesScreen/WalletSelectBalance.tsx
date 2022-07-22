import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { WalletRadio, WalletRadioGroup } from 'web/src/screens/BalancesScreen/WalletRadio';
import { useT } from 'web/src/hooks/useT';
import { Balance } from 'web/src/types/balances.types';

export type WalletSelectBalanceValue = 'p2p' | 'market';

interface Props {
  balance: Balance;
  value: WalletSelectBalanceValue | undefined;
  onChange: (value: WalletSelectBalanceValue) => void;
}

export const WalletSelectBalance: FC<Props> = ({ balance, value, onChange }) => {
  const t = useT();

  const handleChange = (nextValue: string | undefined) =>
    nextValue && onChange(nextValue as WalletSelectBalanceValue);

  return (
    <>
      <Text variant="title">{t('Select a balance')}</Text>
      <Box display="flex" gap="8x" mt="4x" mb="12x">
        <WalletRadioGroup name="answer" value={value} onChange={handleChange}>
          <Box flex={1}>
            <WalletRadio
              label={t('P2P Balance')}
              size="large"
              value="p2p"
              disabled={!balance.p2pBalance}
            >
              {balance.p2pBalance?.balance ? (
                <AmountFormat money={balance.p2pBalance.balance} />
              ) : (
                '–'
              )}
            </WalletRadio>
          </Box>
          <Box flex={1}>
            <WalletRadio
              label={t('Exchange Balance')}
              size="large"
              value="market"
              disabled={!balance.marketBalance}
            >
              {balance.marketBalance?.balance ? (
                <AmountFormat money={balance.marketBalance.balance} />
              ) : (
                '–'
              )}
            </WalletRadio>
          </Box>
          <Box flex={1} />
        </WalletRadioGroup>
      </Box>
    </>
  );
};
