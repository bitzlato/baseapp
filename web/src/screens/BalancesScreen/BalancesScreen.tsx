import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from 'web/src/components/ui/Box';
import { Card } from 'web/src/components/ui/Card';
import { Container } from 'web/src/components/ui/Container';
import { useBalances } from 'web/src/hooks/useBalances';
import { useT } from 'web/src/hooks/useT';
import { WalletNavigation } from 'web/src/screens/BalancesScreen/WalletNavigation';
import { WalletHeader } from './WalletHeader';
import { BalanceList } from './BalanceList';
import { WalletSection } from './WalletSection';
import * as s from './BalancesScreen.css';

const useWalletParams = () => {
  const { currency, section } = useParams<{
    currency?: string;
    section?: string;
  }>();

  return {
    currency: currency?.toUpperCase(),
    section,
  };
};

interface Props {}

export const BalancesScreen: FC<Props> = ({}) => {
  const t = useT();
  const { currency, section } = useWalletParams();
  const balances = useBalances();
  const balance = useMemo(
    () =>
      currency
        ? balances?.find(({ cryptoCurrency: { code } }) => code === currency)
        : balances?.[0],
    [balances, currency],
  );

  const body = (
    <Container maxWidth="xxl" my="6x">
      <WalletHeader balance={balance} />
      <Card display="flex" overflow="hidden">
        <Box className={s.sidebar} flexShrink={0} pb="19x">
          <BalanceList
            balances={balances}
            forceActiveCurrencyCode={!currency ? balance?.cryptoCurrency.code : undefined}
          />
        </Box>
        <Box width="full" pt="5x" pb="19x" px="8x">
          <WalletNavigation balance={balance} section={section} />
          <WalletSection balance={balance} section={section} />
        </Box>
      </Card>
    </Container>
  );

  return body;
};
