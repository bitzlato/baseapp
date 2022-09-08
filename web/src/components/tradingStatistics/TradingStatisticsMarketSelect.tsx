import { FC } from 'react';
import { useT } from 'web/src/hooks/useT';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { SelectCustom } from 'web/src/components/SelectCustom/SelectCustom';
import { TradingViewMarketOption } from 'web/src/types/tradingView.types';

export const searchFunction = (
  searchText: string,
  _optionValue: string,
  option: TradingViewMarketOption,
) => {
  return option.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
};

export const getOptionValue = (option: TradingViewMarketOption) => option.symbol;
export const getOptionLabel = (option: TradingViewMarketOption) =>
  `${option.name}${!option.isExchange ? ` (${option.currencyCode})` : ''}`;

interface Props {
  options: ReadonlyArray<TradingViewMarketOption>;
  value?: TradingViewMarketOption | undefined;
  onChange: (value: TradingViewMarketOption) => void;
}

export const TradingStatisticsMarketSelect: FC<Props> = ({ options, value, onChange }) => {
  const t = useT();

  return (
    <SelectCustom
      placeholder={t('page.body.trade.toolBar.selectMarket')}
      options={options}
      withSearch
      searchFunction={searchFunction}
      searchPlaceholder={t('Search')}
      noOptionsMessage={t('Nothing found')}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionLabel}
      renderOption={({ name, currencyCode, isExchange }) => (
        <Box display="flex" alignItems="center" justifyContent="space-between" gap="4x">
          <Text variant="label">
            {name}
            {!isExchange && (
              <Text as="span" variant="label" color="textMuted">
                {' '}
                ({currencyCode})
              </Text>
            )}
          </Text>
          <Box ml="auto">
            <Text variant="caption" color="textMuted">
              {isExchange ? t('Exchange') : t('P2P')}
            </Text>
          </Box>
        </Box>
      )}
      value={value ?? null}
      onChange={onChange}
    />
  );
};
