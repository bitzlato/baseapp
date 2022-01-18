import React from 'react';
import { useT } from 'src/hooks/useT';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { Box } from 'src/components/Box';
import { TradingFee } from 'src/modules/public/tradingFees/types';
import { createCcy, createMoney } from 'src/helpers/money';
import s from './TradingFees.postcss';

interface Props {
  tradingFees: TradingFee[];
}

export const TradingFees: React.FC<Props> = (props) => {
  const t = useT();
  const anyGroup = props.tradingFees.find((d) => d.group === 'any');
  return (
    <>
      <Box textColor="primary" as="h4">
        {t('page.fees.trading')}
      </Box>
      <Box row spacing="sm" textSize="lg" justify="center">
        <Box row spacing="2">
          <Box row justify="center" className={s.feesRect}>
            <AmountFormat
              money={createMoney(anyGroup?.taker ?? 0, CCY).multiply(100)}
              minFractionDigits={1}
            />
            %
          </Box>
          <Box textColor="primary" as="span">
            {t('page.fees.taker')}
          </Box>
        </Box>
        <Box grow className={s.feesDivider} />
        <Box row spacing="2">
          <Box row justify="center" className={s.feesRect}>
            <AmountFormat
              money={createMoney(anyGroup?.maker ?? 0, CCY).multiply(100)}
              minFractionDigits={1}
            />
            %
          </Box>
          <Box textColor="primary" as="span">
            {t('page.fees.maker')}
          </Box>
        </Box>
      </Box>
    </>
  );
};

const CCY = createCcy('', 2);
