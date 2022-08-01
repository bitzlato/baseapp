import { FC } from 'react';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { SelectCustom } from 'web/src/components/SelectCustom/SelectCustom';
import {
  getOptionLabel,
  getOptionValue,
  searchFunction,
} from 'web/src/components/shared/Ads/InputAmountWithCurrency';
import { useP2PWalletOptions } from 'web/src/hooks/useP2PWalletOptions';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { CryptoCurrencyOption } from 'web/src/components/shared/Ads/CryptoCurrencyOption';
import { Box } from 'web/src/components/ui/Box';
import * as s from './SelectCryptoCurrency.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SelectCryptoCurrency: FC<Props> = ({ value, onChange }) => {
  const t = useSharedT();
  const { getFiatCurrency } = useP2PFiatCurrencies();
  const { selectedWalletOption, walletOptions } = useP2PWalletOptions(value, getFiatCurrency);

  return (
    <>
      <Box
        className={s.mobileContainer}
        display={{ mobile: 'flex', desktop: 'none' }}
        alignItems="center"
        gap="2x"
        flexWrap="nowrap"
        px="5x"
      >
        {walletOptions.map((option) => {
          const isActive = option.code === selectedWalletOption?.code;
          return (
            <Box
              key={option.code}
              className={s.mobileButton}
              as="button"
              type="button"
              flexShrink={0}
              h="6x"
              px="3x"
              fontSize="medium"
              fontWeight="medium"
              borderWidth="1x"
              borderStyle="solid"
              borderColor={
                isActive ? 'advertsCryptoButtonActiveBorder' : 'advertsCryptoButtonBorder'
              }
              backgroundColor={
                isActive
                  ? {
                      default: 'advertsCryptoButtonActiveBg',
                      hover: 'advertsCryptoButtonActiveBgHover',
                    }
                  : {
                      default: 'advertsCryptoButtonBg',
                      hover: 'advertsCryptoButtonBgHover',
                    }
              }
              color="text"
              onClick={() => onChange(option.code)}
            >
              {option.code}
            </Box>
          );
        })}
      </Box>

      <Box className={s.desktopContainer}>
        <SelectCustom
          withSearch
          options={walletOptions}
          value={selectedWalletOption}
          searchFunction={searchFunction}
          searchPlaceholder={t('Search')}
          noOptionsMessage={t('Nothing found')}
          getOptionValue={getOptionValue}
          getOptionLabel={getOptionLabel}
          renderOption={CryptoCurrencyOption}
          onChange={(option) => onChange(option.code)}
        />
      </Box>
    </>
  );
};
