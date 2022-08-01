import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { P2PWalletOption } from 'web/src/hooks/useP2PWalletOptions';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';

interface Props extends P2PWalletOption {}

export const CryptoCurrencyOption = ({ code, balance, name, worth }: Props) => {
  return (
    <Box display="flex" alignItems="center" gap="4x">
      <CryptoCurrencyIcon size="9x" currency={code} />
      <Box display="flex" flexDirection="column" gap="1x" flexGrow={1}>
        <Box display="flex" justifyContent="space-between">
          <Text>{code}</Text>
          {balance && (
            <Text>
              <MoneyFormat money={balance} />
            </Text>
          )}
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text color="textMuted" fontWeight="regular">
            {name}
          </Text>
          {worth && (
            <Text color="textMuted" fontWeight="regular">
              <MoneyFormat money={worth} />
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};
