import { FC, ReactNode } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useAppContext } from 'web/src/components/app/AppContext';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { Text } from 'web/src/components/ui/Text';

interface CurrencyProps {
  title: string;
  amount: string;
  code: string;
  icon?: ReactNode;
}

const Currency: FC<CurrencyProps> = ({ title, amount, code, icon = null }) => {
  const { isMobileDevice } = useAppContext();

  if (isMobileDevice) {
    return (
      <Box
        flex={1}
        display="flex"
        backgroundColor="tradeMobileInfoBackgroundPrimary"
        py="2x"
        px="4x"
        borderRadius="1.5x"
        alignItems="center"
      >
        <Box display="flex" flexDirection="column">
          <Box as="span" fontSize="caption" color="tradeCurrenciesTitleColor">
            {title}
          </Box>
          <Text as="span" fontSize="medium" color="tradeCurrenciesValueColor">
            {amount}
          </Text>
        </Box>
        <Box display="flex" flex={1} justifyContent="flex-end">
          <Box backgroundColor="tradeCurrenciesBackground" p="2x" borderRadius="1x">
            <Box display="flex" alignItems="center" gap="1x">
              {icon}
              <Text as="span">{code}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      flex={1}
      display="flex"
      backgroundColor="tradeCurrenciesBackground"
      py="5x"
      px="6x"
      borderRadius="1.5x"
      alignItems="center"
    >
      <Box display="flex" flexDirection="column">
        <Box as="span" fontSize="large" color="tradeCurrenciesTitleColor">
          {title}
        </Box>
        <Box as="span" fontSize="lead" color="tradeCurrenciesValueColor">
          {amount}
        </Box>
      </Box>
      <Box display="flex" flex={1} justifyContent="flex-end">
        <Box backgroundColor="tradeCurrenciesCodeBackground" p="2x" borderRadius="1x">
          <Box display="flex" alignItems="center" gap="1x">
            {icon}
            <Box as="span">{code}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const TradeCurrencies: FC = () => {
  const { t, formattedTradeValues } = useTradeContext();
  const { trade } = useTradeContext();
  const { isMobileDevice } = useAppContext();

  const isSelling = trade.type === 'selling';

  return (
    <Box display="flex" flexDirection={isMobileDevice ? 'column' : 'row'} gap="3x">
      <Currency
        title={isSelling ? t('trade.currencies.you_get') : t('trade.currencies.you_pay')}
        amount={formattedTradeValues.currency}
        code={trade.currency.code}
      />
      <Currency
        title={isSelling ? t('trade.currencies.you_pay') : t('trade.currencies.you_get')}
        amount={formattedTradeValues.cryptocurrency}
        code={trade.cryptocurrency.code}
        icon={
          <Box>
            <CryptoCurrencyIcon size="6x" currency={trade.cryptocurrency.code} />
          </Box>
        }
      />
    </Box>
  );
};
