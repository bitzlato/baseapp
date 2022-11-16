import { FC, useMemo } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { P2PMiniChart } from 'web/src/components/shared/Ads/P2PMiniChart';
import { AdvertParams } from 'web/src/modules/p2p/types';
import { useFetchPaymethods } from 'web/src/hooks/data/useFetchPaymethods';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { Badge } from 'web/src/components/ui/Badge';
import ChevronDownIcon from 'web/src/assets/svg/ChevronDownIcon.svg';
import { Button } from 'web/src/components/ui/Button';
import { useLocalStorage } from 'web/src/hooks/useLocalStorage';

import * as s from './BoardChart.css';

interface Props {
  filterParams: AdvertParams;
}

export const BoardChart: FC<Props> = ({ filterParams }) => {
  const [chartOpen, setChartOpen] = useLocalStorage<'open' | 'close'>('p2pBoardChartOpen', 'open');
  const isChartOpen = chartOpen === 'open';
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

  const handleChevronClick = () => {
    setChartOpen(chartOpen === 'open' ? 'close' : 'open');
  };

  return (
    <Box backgroundColor="block" py="5x" px="6x" borderRadius="1.5x" mb="6x">
      <Box display="flex" alignItems="center" mb={isChartOpen ? '4x' : undefined}>
        <Box display="flex" alignItems="center" gap="4x">
          <CryptoCurrencyIcon currency={filterParams.cryptocurrency} size="8x" />
          <Box display="flex" gap="2x" alignItems="center">
            <Text variant="label">{cryptoCurrency.name}</Text>
            <Badge variant="clarified">
              <Text as="span" variant="caption" fontWeight="regular">
                {filterParams.cryptocurrency}
              </Text>
            </Badge>
            <Text variant="title">/</Text>
            <Text variant="title">{pyamethod.description}</Text>
            <Badge variant="clarified">
              <Text as="span" variant="caption" fontWeight="regular">
                {filterParams.currency}
              </Text>
            </Badge>
          </Box>
        </Box>
        <Box ml="auto">
          <Button
            variant="text"
            color="clarified"
            size="icon"
            data-gtm-click={isChartOpen ? 'board_chart_close' : 'board_chart_open'}
            onClick={handleChevronClick}
          >
            <Box as="span" className={s.chevrone[isChartOpen ? 'up' : 'down']}>
              <ChevronDownIcon />
            </Box>
          </Button>
        </Box>
      </Box>
      {filterParams.slug && isChartOpen && (
        <P2PMiniChart cryptocurrency={filterParams.cryptocurrency} paymethod={filterParams.slug} />
      )}
    </Box>
  );
};
