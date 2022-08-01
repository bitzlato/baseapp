import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { TextInput } from 'web/src/components/TextInputCustom/TextInputCustom';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { createMoney } from 'web/src/helpers/money';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { RateRatio } from './RateRatio';
import * as s from './ChooseRate.css';

export type RateType = 'fixed' | 'floating';

interface ChooseRateProps {
  value: RateType;
  title: string;
  isActive: boolean;
  onChange: (value: RateType) => void;
}

const ChooseRateVariant: FC<ChooseRateProps> = ({ children, value, title, isActive, onChange }) => {
  return (
    <Box
      key={value}
      className={isActive ? s.selectedRate : undefined}
      py="3x"
      px="4x"
      borderRadius="1.5x"
      borderWidth="1x"
      borderStyle="solid"
      borderColor={isActive ? 'advertsRateActive' : 'inputBorder'}
      backgroundColor={isActive ? 'advertsRateActive' : 'transparent'}
      onClick={() => onChange(value)}
    >
      <Text fontWeight="strong">{title}</Text>

      <Box display="flex" alignItems="center" mt="3x" gap="3x">
        {children}
      </Box>
    </Box>
  );
};

interface Props {
  type: RateType;
  fixed: string;
  percent: string;
  currency: string | undefined;
  cryptoCurrency: string;
  onChangeType: (value: RateType) => void;
  onChangeFixed: (value: string) => void;
  onChangePercent: (value: string) => void;
}

export const ChooseRate: FC<Props> = ({
  type,
  fixed,
  percent,
  currency,
  cryptoCurrency,
  onChangeType,
  onChangeFixed,
  onChangePercent,
}) => {
  const { t } = useAdapterContext();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();
  const ccy = getCryptoCurrency(cryptoCurrency);

  return (
    <>
      <ChooseRateVariant
        title={t('Fixed rate')}
        value="fixed"
        isActive={type === 'fixed'}
        onChange={onChangeType}
      >
        <Box flexGrow={1}>
          <TextInput size="small" value={fixed} onChange={onChangeFixed} />
        </Box>
        <Text>
          {t('trade.state.for')} <MoneyFormat money={createMoney(1, ccy)} />
        </Text>
      </ChooseRateVariant>
      <ChooseRateVariant
        title={t('Floating rate')}
        value="floating"
        isActive={type === 'floating'}
        onChange={onChangeType}
      >
        <Box position="relative" width="20x" flexShrink={0}>
          <TextInput
            className={s.floatingInput}
            size="small"
            value={percent}
            onChange={onChangePercent}
          />

          <Box
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="5x"
            height="5x"
            m="2x"
            color="text"
            borderRadius="1x"
            backgroundColor="advertsPercentBadge"
          >
            %
          </Box>
        </Box>

        <RateRatio percent={percent} currency={currency} cryptoCurrency={cryptoCurrency} />
      </ChooseRateVariant>
    </>
  );
};
