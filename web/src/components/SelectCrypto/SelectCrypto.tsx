import { FC, useEffect, useState } from 'react';
import { Stack } from 'web/src/components/ui/Stack';
import { Box } from 'web/src/components/ui/Box';
import { Box as Box2 } from 'src/components/Box/Box';
import { SelectPicker } from 'web/src/components/ui/SelectPicker';
import { getCurrencyCodeSymbol } from '../../helpers/getCurrencySymbol';
import { useGeneralWallets } from '../../hooks/useGeneralWallets';
import { AmountFormat } from '../AmountFormat/AmountFormat';
import { CryptoCurrencyIcon } from '../CryptoCurrencyIcon/CryptoCurrencyIcon';
import { MoneyFormat } from '../MoneyFormat/MoneyFormat';
import { Select } from '../Select/Select';
import { WalletItemData } from '../WalletItem/WalletItem';

interface Props {
  label: string;
  value: WalletItemData | null;
  onChange: (value: WalletItemData) => void;
  defaultCurrencyCode?: string;
}

const renderCryptoListItem = (wallet: WalletItemData) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap="3x">
      <CryptoCurrencyIcon size="small" currency={wallet.currency} />
      <Box2 grow row align="start" justify="between">
        <Box2 col align="start" textAlign="start">
          <Box2 textSize="title">{getCurrencyCodeSymbol(wallet.currency)}</Box2>
          <Box2 textSize="description">{wallet.name}</Box2>
        </Box2>
        <Box2 col align="end">
          <Box2 textSize="title">
            <AmountFormat money={wallet.balanceTotal} />
          </Box2>
          {wallet.approximate.isZero() ? null : (
            <Box2 textSize="description">
              <Box2 as="span" textColor="secondary">
                &asymp;
              </Box2>
              &nbsp;
              <MoneyFormat money={wallet.approximate} />
            </Box2>
          )}
        </Box2>
      </Box2>
    </Box>
  );
};

const renderCryptoValue = (wallet: WalletItemData) => {
  return (
    <Box display="flex" flexDirection="row">
      <CryptoCurrencyIcon size="small" currency={wallet.currency} />
      <Box as="span">{wallet.name}</Box>
    </Box>
  );
};

export const SelectCrypto: FC<Props> = ({ label, value, onChange, defaultCurrencyCode }) => {
  const cryptoList: WalletItemData[] = useGeneralWallets();

  const [defaultValue, setDefaultValue] = useState<WalletItemData | null>(null);

  useEffect(() => {
    if (cryptoList.length && defaultCurrencyCode) {
      const c = cryptoList.find((item) => item.currency === defaultCurrencyCode);
      if (c) {
        setDefaultValue(c);
      }
    }
  }, [cryptoList, defaultCurrencyCode, setDefaultValue]);

  return (
    <Stack direction="column" marginBottom="5x">
      <Select<WalletItemData>
        isSearchable
        options={cryptoList}
        placeholder={label}
        value={value || defaultValue}
        getOptionValue={(v) => v.currency}
        onChange={(v) => {
          onChange(v as WalletItemData);
        }}
        formatOptionLabel={renderCryptoValue}
      />
      <SelectPicker<WalletItemData>
        label={label}
        options={cryptoList}
        value={value || defaultValue}
        onChange={onChange}
        itemLabel={(v) => `${v.currency} ${v.name}`}
        itemRender={renderCryptoListItem}
        itemValue={(v) => v.currency}
        valueRender={renderCryptoValue}
      />
    </Stack>
  );
};
