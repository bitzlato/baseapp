import { FC, ChangeEvent } from 'react';

import { SearchIcon } from 'src/assets/icons/SearchIcon';
import { CrossIcon } from 'src/assets/icons/CrossIcon';
import { useT } from 'src/hooks/useT';
import s from './MarketSelectorSearchInput.postcss';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const MarketSelectorSearchInput: FC<Props> = ({ value, onChange }: Props) => {
  const t = useT();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange(value);
  };
  const handleCrossClick = () => {
    onChange('');
  };

  return (
    <div className={s.wrapper}>
      <div className={s.icon}>
        <SearchIcon />
      </div>
      <input
        className={s.input}
        placeholder={t('page.body.trade.header.markets.content.search')}
        value={value}
        onChange={handleChange}
      />
      {value !== '' && (
        <button className={s.clearButton} type="button" tabIndex={-1} onClick={handleCrossClick}>
          <CrossIcon />
        </button>
      )}
    </div>
  );
};
