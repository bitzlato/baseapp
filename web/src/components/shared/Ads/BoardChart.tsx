import { FC, useMemo } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { P2PMiniChart } from 'web/src/components/shared/Ads/P2PMiniChart';
import { AdvertParams } from 'web/src/modules/p2p/types';
import { useFetchPaymethods } from 'web/src/hooks/data/useFetchPaymethods';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { Badge } from 'web/src/components/ui/Badge';

interface Props {
  filterParams: AdvertParams;
}

export const BoardChart: FC<Props> = ({ filterParams }) => {
  const { data: paymethods } = useFetchPaymethods({
    lang: filterParams.lang,
    type: filterParams.type,
    currency: filterParams.currency,
    cryptocurrency: filterParams.cryptocurrency,
    isOwnerActive: filterParams.isOwnerActive,
    isOwnerTrusted: filterParams.isOwnerTrusted,
    isOwnerVerificated: filterParams.isOwnerVerificated,
  });
  const { getCryptoCurrency, cryptoCurrencies } = useP2PCryptoCurrencies();

  const pyamethod = useMemo(
    () => paymethods?.data.find(({ slug }) => slug === filterParams.slug),
    [filterParams.slug, paymethods],
  );
  const cryptoCurrency = getCryptoCurrency(filterParams.cryptocurrency);

  if (!pyamethod || !cryptoCurrencies) {
    return null;
  }

  return (
    <Box backgroundColor="block" py="5x" px="6x" borderRadius="1.5x" mb="2x">
      <Box display="flex" alignItems="center" gap="4x" mb="4x">
        <CryptoCurrencyIcon currency={filterParams.cryptocurrency} size="11x" />
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Text variant="title">
            {cryptoCurrency.name}/{pyamethod.description}{' '}
          </Text>
          <Badge variant="clarified">
            <Text as="span" variant="caption" fontWeight="regular">
              {filterParams.cryptocurrency}/{filterParams.currency}
            </Text>
          </Badge>
        </Box>
      </Box>
      {filterParams.slug && (
        <P2PMiniChart cryptocurrency={filterParams.cryptocurrency} paymethod={filterParams.slug} />
      )}
    </Box>
  );
};
