import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useAppContext } from 'web/src/components/app/AppContext';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';

const Currency: FC<{ title: string; value: number; code: string; icon?: JSX.Element }> = ({
  title,
  value,
  code,
  icon = null,
}) => {
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
          <Box as="span" fontSize="medium" color="tradeCurrenciesValueColor">
            {value}
          </Box>
        </Box>
        <Box display="flex" flex={1} justifyContent="flex-end">
          <Box backgroundColor="tradeCurrenciesBackground" p="2x" borderRadius="1x">
            <Box display="flex" alignItems="center" gap="1x">
              {icon}
              <Box as="span">{code}</Box>
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
          {value}
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
  const { t } = useTradeContext();
  const { trade } = useTradeContext();
  const { isMobileDevice } = useAppContext();

  return (
    <Box display="flex" flexDirection={isMobileDevice ? 'column' : 'row'} gap="3x">
      <Currency
        title={t('trade.currencies.you_pay')}
        value={trade.currency.amount}
        code={trade.currency.code}
      />
      <Currency
        title={t('trade.currencies.you_get')}
        value={trade.cryptocurrency.amount}
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
