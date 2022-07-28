import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { RadioGroup, Radio } from 'web/src/components/form/Radio';
import { BlockchainFees } from 'web/src/types/blockchains.types';
import { useT } from 'web/src/hooks/useT';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { Money } from '@bitzlato/money-js';
import { Skeleton } from 'web/src/components/ui/Skeleton';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';
import * as s from './WithdrawBlockchainFees.css';

export type BlockchainFeeType = 'low' | 'market' | 'aggressive';

type WithdrawBlockchainFeeProps = {
  type: BlockchainFeeType;
  title: string;
  description: string;
  fee: Money;
  feeInFiat?: Money | undefined;
  active: boolean;
};

const WithdrawBlockchainFee: FC<WithdrawBlockchainFeeProps> = ({
  type,
  title,
  description,
  fee,
  feeInFiat,
  active,
}) => (
  <div className={s.item[active ? 'active' : 'base']}>
    <Radio value={type}>
      <Box as="span" fontSize="medium" fontWeight="strong">
        {title}
      </Box>{' '}
      ({description})
      <Box as="span" display="flex" alignItems="center" justifyContent="space-between" mt="1x">
        <MoneyFormat money={fee} />

        {feeInFiat && (
          <Box as="span" bg="withdrawBlockchainFeeFiatBackground" p="1x" borderRadius="1x">
            <MoneyFormat money={feeInFiat} />
          </Box>
        )}
      </Box>
    </Radio>
  </div>
);

const WithdrawBlockchainFeeSkeleton: FC = () => (
  <Box className={s.item.base} p="3x">
    <Box fontSize="medium" fontWeight="strong">
      <Skeleton w="20x" />

      <Box mt="1x" py="1x">
        <Skeleton w="full" />
      </Box>
    </Box>
  </Box>
);

interface Props {
  blockchainFees?: BlockchainFees | undefined;
  value?: BlockchainFeeType | undefined;
  onChange: (feeType: BlockchainFeeType) => void;
}

export const WithdrawBlockchainFees: FC<Props> = ({ blockchainFees, value, onChange }) => {
  const isMobileDevice = useIsMobileDevice();
  const t = useT();

  const title = (
    <>
      <Text variant="title">{t('Withdrawal method')}</Text>
      {isMobileDevice && <Text variant="caption">{t('withdrawalFee.help')}</Text>}
    </>
  );

  if (!blockchainFees) {
    return (
      <>
        {title}
        <div className={s.fees}>
          <WithdrawBlockchainFeeSkeleton />
          <WithdrawBlockchainFeeSkeleton />
          <WithdrawBlockchainFeeSkeleton />
        </div>
      </>
    );
  }

  const handleChange = (nextValue: string | undefined) =>
    nextValue && onChange(nextValue as BlockchainFeeType);

  const { low, lowInFiat, market, marketInFiat, aggressive, aggressiveInFiat } =
    blockchainFees.fees;

  return (
    <>
      {title}
      <Box color="text" className={s.fees}>
        <RadioGroup value={value} onChange={handleChange}>
          {low && (
            <WithdrawBlockchainFee
              type="low"
              title={t('Slow')}
              description={t('up to 24 hours')}
              fee={low}
              feeInFiat={lowInFiat}
              active={value === 'low'}
            />
          )}
          {market && (
            <WithdrawBlockchainFee
              type="market"
              title={t('Medium')}
              description={t('up to 2 hours')}
              fee={market}
              feeInFiat={marketInFiat}
              active={value === 'market'}
            />
          )}
          {aggressive && (
            <WithdrawBlockchainFee
              type="aggressive"
              title={t('Fast')}
              description={t('up to 30 minutes')}
              fee={aggressive}
              feeInFiat={aggressiveInFiat}
              active={value === 'aggressive'}
            />
          )}
        </RadioGroup>
      </Box>
    </>
  );
};
