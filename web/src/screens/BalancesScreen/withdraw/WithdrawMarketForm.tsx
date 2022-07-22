import { FC, useState } from 'react';
import { AddressNotebook } from 'web/src/components/addressNotebook/AddressNotebook';
import { TextInputWithControl } from 'web/src/components/TextInputCustom/TextInputWithControl';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { useT } from 'web/src/hooks/useT';
import { Balance } from 'web/src/types/balances.types';

interface Props {
  balance: Balance;
}

export const WithdrawMarketForm: FC<Props> = ({ balance }) => {
  const t = useT();
  const [amount, setAmount] = useState('');

  const handleAmountChange = (nextAmount: string) =>
    setAmount(parseNumeric(nextAmount, { maxFractionDigits: balance.cryptoCurrency.minorUnit }));

  return (
    <form>
      <Text variant="title">{t('Enter the amount and withdrawal address')}</Text>
      <Box display="flex" gap="8x" mt="4x">
        <Box flex={1}>
          <TextInputWithControl
            label={t('page.body.wallets.tabs.withdraw.content.amount')}
            inputMode="decimal"
            value={amount}
            control={
              <Box>
                <Text variant="caption" color="textMuted">
                  Доступно
                </Text>
                <Text variant="caption">0.0000</Text>
              </Box>
            }
            onChange={handleAmountChange}
            onControlClick={() => {}}
          />
        </Box>
        <Box flex={1}>
          {/* <AddressNotebookMarket wallet={wallet} onChangeValue={setBeneficiary} /> */}
          <AddressNotebook />
        </Box>
      </Box>
    </form>
  );
};
