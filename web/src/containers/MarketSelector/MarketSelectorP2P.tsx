import { FC } from 'react';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { SelectCustom } from 'web/src/components/SelectCustom/SelectCustom';
import { TradingViewMarket } from '../TradingChart/api';

interface Props {
  options: TradingViewMarket[];
  value: TradingViewMarket | null;
  onChange: (value: TradingViewMarket) => void;
}

const searchFunction = (search: string, _optionValue: string, option: TradingViewMarket) =>
  option.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
const getOptionValue = (option: TradingViewMarket) => option.id.toString();
const getOptionLabel = (option: TradingViewMarket) => option.name;

export const MarketSelectorP2P: FC<Props> = ({ options, value, onChange }) => {
  const t = useSharedT();

  return (
    <SelectCustom
      options={options}
      value={value}
      placeholder={t('Market')}
      noOptionsMessage={t('Nothing found')}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionLabel}
      searchFunction={searchFunction}
      searchPlaceholder={t('Search')}
      withSearch
      onChange={onChange}
    />
  );
};
