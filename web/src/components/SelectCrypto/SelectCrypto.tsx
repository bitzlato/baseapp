import { FC, useEffect, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useGeneralWallets } from '../../hooks/useGeneralWallets';
import { CryptoCurrencyIcon } from '../CryptoCurrencyIcon/CryptoCurrencyIcon';
import { Select } from '../Select/Select';
import { WalletItemData } from '../WalletItem/WalletItem';

interface Props {
  label: string;
  value: WalletItemData | null,
  onChange: (value: WalletItemData) => void;
  defaultCurrencyCode?: string;
}

const renderCryptoListItem = (d: WalletItemData) => {
  // todo: show current balance
  return (
    <Box display="flex" flexDirection="row">
      <CryptoCurrencyIcon size="small" currency={d.currency} />
      <Box as="span">{d.name}</Box>
    </Box>
  );
};

export const SelectCrypto: FC<Props> = ({
  label, value, onChange,
  defaultCurrencyCode,
}) => {
  const cryptoList: WalletItemData[] = useGeneralWallets();

  const [defaultValue, setDefaultValue] = useState<WalletItemData | null>(null)

  useEffect(() => {
    if (cryptoList.length && defaultCurrencyCode){
      const c = cryptoList.find((item) => item.currency === defaultCurrencyCode);
      if (c) {
        setDefaultValue(c);
      }
    }
  }, [cryptoList, defaultCurrencyCode, setDefaultValue])

  return (
    <Select<WalletItemData>
      isSearchable
      options={cryptoList}
      placeholder={label}
      value={value || defaultValue}
      getOptionValue={(v) => v.currency}
      onChange={(v) => {
        onChange(v as WalletItemData)
      }}
      formatOptionLabel={renderCryptoListItem}
    />
  )
}
