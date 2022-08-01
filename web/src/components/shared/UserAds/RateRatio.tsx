import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useDebounce } from 'use-debounce';
import { useFetchRateByParams } from 'web/src/hooks/data/useFetchRate';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { Spinner } from 'web/src/components/ui/Spinner';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { createMoney } from 'web/src/helpers/money';

interface Props {
  currency?: string | undefined;
  cryptoCurrency: string;
  percent: string;
}

export const RateRatio: FC<Props> = ({ percent, currency, cryptoCurrency }) => {
  const { t } = useAdapterContext();
  const [defferedPercent] = useDebounce(percent, 1000);
  const { getFiatCurrency } = useP2PFiatCurrencies();
  const { data: rateFloating, isValidating: isRateFloatingValidating } = useFetchRateByParams(
    cryptoCurrency,
    {
      currency,
      percent: defferedPercent ? Number(defferedPercent) : undefined,
    },
  );
  const { data: rateForOne } = useFetchRateByParams(cryptoCurrency, {
    currency,
    percent: 0,
  });

  if (!rateForOne) {
    return null;
  }

  const rateFloatingMoney = rateFloating ? (
    <MoneyFormat money={createMoney(rateFloating.value, getFiatCurrency(rateFloating.currency))} />
  ) : null;

  return (
    <Box display="flex" alignItems="center" flexWrap="wrap">
      <Text fontSize="medium">
        {t('from')}{' '}
        <MoneyFormat money={createMoney(rateForOne.value, getFiatCurrency(rateForOne.currency))} />
        {' ='}
      </Text>
      <Box ml="1x" fontSize="medium">
        {isRateFloatingValidating ? <Spinner size="5x" /> : rateFloatingMoney}
      </Box>
    </Box>
  );
};
