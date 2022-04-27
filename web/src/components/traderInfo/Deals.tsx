import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useT } from 'web/src/hooks/useT';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { DealStat } from 'web/src/modules/types';
import { createMoneyWithoutCcy } from 'web/src/helpers/money';
import * as styles from './Deals.css';
import { AmountFormat } from '../AmountFormat/AmountFormat';

interface DealsProps {
  data?: DealStat[];
}

export const Deals: FC<DealsProps> = ({ data }) => {
  const t = useT();
  const [showMore, setShowMore] = useState(false);
  const list = data || [];

  return (
    <>
      <Box mb="4x">{t('trader.block.transactionVolume')}</Box>
      <Box
        display="flex"
        position="relative"
        overflowY={showMore ? 'auto' : undefined}
        flexDirection="column"
        flexGrow={1}
        m="2x"
      >
        <Box position="absolute" w="full">
          <Box
            display="flex"
            flexDirection="column"
            position="relative"
            flexGrow={1}
            className={!showMore ? styles.dataBlock : ''}
          >
            {list.slice(0, !showMore ? 5 : undefined).map((item: DealStat) => (
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
                  <AmountFormat money={createMoneyWithoutCcy(item.totalAmount, 3)} />{' '}
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
    </>
  );
};
