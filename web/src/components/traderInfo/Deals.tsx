import { FC, useMemo, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useT } from 'web/src/hooks/useT';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { DealStat } from 'web/src/modules/types';
import { CollapsibleBox } from 'web/src/components/collapsibleBox/CollapsibleBox';
import { useCryptoCurrencies } from 'web/src/hooks/useCryptoCurrencies';
import { createMoney } from 'web/src/helpers/money';
import * as styles from './Deals.css';
import { AmountFormat } from '../AmountFormat/AmountFormat';

interface DealsProps {
  data?: DealStat[];
}

export const Deals: FC<DealsProps> = ({ data }) => {
  const t = useT();
  const [showMore, setShowMore] = useState(false);
  const { getCryptoCurrency } = useCryptoCurrencies();

  const list = useMemo(
    () =>
      (data || []).map((item: DealStat) => {
        const currency = getCryptoCurrency(item.cryptocurrency);

        return {
          ...item,
          totalAmount: createMoney(item.totalAmount, currency),
        };
      }),
    [data, getCryptoCurrency],
  );

  return (
    <>
      <Box display={{ desktop: 'flex', mobile: 'none' }} w="full" flex={1} flexDirection="column">
        <Box mb="4x">{t('trader.block.transactionVolume')}</Box>
        <Box
          display="flex"
          position="relative"
          overflowY={showMore ? 'auto' : undefined}
          flexDirection="column"
          flexGrow={1}
          m="2x"
        >
          <Box display="flex" position="absolute" w="full">
            <Box
              display="flex"
              flexDirection="column"
              position="relative"
              flexGrow={1}
              className={!showMore ? styles.dataBlock : ''}
            >
              {list.slice(0, !showMore ? 5 : undefined).map((item) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  py="3x"
                  borderBottomWidth="1x"
                  borderColor="traderBg"
                  borderStyle="solid"
                >
                  <Text fontWeight="strong">{item.cryptocurrency}</Text>
                  <Text>
                    <AmountFormat money={item.totalAmount} />
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        {!showMore && (
          <Box pt="8x" mb="4x" display="flex" justifyContent="center">
            <Button color="clarified" variant="text" onClick={() => setShowMore(true)}>
              {t('show all')}
            </Button>
          </Box>
        )}
      </Box>
      <Box display={{ desktop: 'none', mobile: 'flex' }}>
        <CollapsibleBox
          visible={
            <>
              <Box my="2x" color="text">
                {t('trader.block.transactionVolume')}
              </Box>
              {list.slice(0, 3).map((item) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  py="3x"
                  borderBottomWidth="1x"
                  borderColor="traderBg"
                  borderStyle="solid"
                >
                  <Text fontWeight="strong" color="textMuted">
                    {item.cryptocurrency}
                  </Text>
                  <Text>
                    <AmountFormat money={item.totalAmount} />
                  </Text>
                </Box>
              ))}
            </>
          }
          hidden={
            <>
              {list.slice(3).map((item) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  py="3x"
                  borderBottomWidth="1x"
                  borderColor="traderBg"
                  borderStyle="solid"
                >
                  <Text fontWeight="strong" color="textMuted">
                    {item.cryptocurrency}
                  </Text>
                  <Text>
                    <AmountFormat money={item.totalAmount} />
                  </Text>
                </Box>
              ))}
            </>
          }
        />
      </Box>
    </>
  );
};
