import { FC, useMemo, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { CollapsibleBox } from 'web/src/components/collapsibleBox/CollapsibleBox';
import { createMoney } from 'web/src/helpers/money';
import { DealStat } from 'web/src/modules/p2p/user.types';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import * as styles from './Deals.css';

interface DealsProps {
  deals: DealStat[];
}

export const Deals: FC<DealsProps> = ({ deals }) => {
  const t = useSharedT();
  const [showMore, setShowMore] = useState(false);
  const { getCryptoCurrency } = useP2PCryptoCurrencies();

  const list = useMemo(
    () =>
      deals
        .map((item) => {
          const currency = getCryptoCurrency(item.cryptocurrency);

          return {
            ...item,
            totalAmount: createMoney(item.totalAmount, currency),
          };
        })
        .filter((item) => item.cryptocurrency !== 'common' && !item.totalAmount.isZero())
        .sort((a, b) => b.totalCount - a.totalCount),
    [deals, getCryptoCurrency],
  );

  if (list.length === 0) {
    return null;
  }

  const isLongList = list.length > 5;
  const shortListForMobile = list.slice(0, 3);

  return (
    <>
      <Box
        display={{ mobile: 'none', tablet: 'flex' }}
        height="full"
        flex={1}
        flexDirection="column"
        gap="2x"
      >
        <Text variant="title">{t('Transaction volume')}</Text>
        <Box
          display="flex"
          position="relative"
          overflowY={showMore ? 'auto' : undefined}
          flexDirection="column"
        >
          <Box
            className={!showMore && isLongList ? styles.dataBlock : ''}
            position="relative"
            display="flex"
            flexDirection="column"
          >
            {(isLongList ? list.slice(0, !showMore ? 5 : undefined) : list).map((item) => (
              <Box
                key={item.cryptocurrency}
                display="flex"
                justifyContent="space-between"
                py="3x"
                borderBottomWidth="1x"
                borderColor="traderBg"
                borderStyle="solid"
              >
                <Text variant="label" fontWeight="strong">
                  {item.cryptocurrency}
                </Text>
                <Text variant="label">
                  <AmountFormat money={item.totalAmount} />
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
        {!showMore && isLongList && (
          <Box display="flex" justifyContent="center">
            <Button color="clarified" variant="text" onClick={() => setShowMore(true)}>
              {t('Show all')}
            </Button>
          </Box>
        )}
      </Box>
      <Box display={{ mobile: 'flex', tablet: 'none' }}>
        <CollapsibleBox
          visible={
            <>
              <Box my="2x" color="text" fontSize="medium" fontWeight="strong">
                {t('Transaction volume')}
              </Box>
              {shortListForMobile.map((item, index) => (
                <Box
                  key={item.cryptocurrency}
                  display="flex"
                  justifyContent="space-between"
                  py="3x"
                  borderBottomWidth={index < shortListForMobile.length - 1 ? '1x' : '0'}
                  borderColor="traderStatRowMobileBorder"
                  borderStyle="solid"
                >
                  <Text variant="label" fontWeight="strong" color="traderCurrencyCode">
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
            list.length > 3 ? (
              <>
                {list.slice(3).map((item) => (
                  <Box
                    key={item.cryptocurrency}
                    display="flex"
                    justifyContent="space-between"
                    py="3x"
                    borderBottomWidth="1x"
                    borderColor="traderStatRowMobileBorder"
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
            ) : null
          }
        />
      </Box>
    </>
  );
};
