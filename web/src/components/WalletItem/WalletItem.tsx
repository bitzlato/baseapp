import React, { FC } from 'react';
import cn from 'classnames';
import { Money } from '@bitzlato/money-js';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { Box } from 'src/components/Box/Box';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { Wallet } from 'src/modules/user/wallets/types';
import { GeneralBalance } from 'src/modules/account/types';

import s from './WalletItem.postcss';

export interface WalletItemData {
  name: string;
  currency: string;
  balance: Money;
  balanceP2P: Money;
  balanceMarket: Money;
  approximate: Money;
  locked: Money;
  icon: string;
  hasTransfer: boolean;
}

interface Props {
  active?: boolean;
  wallet: WalletItemData;
  onClick?: () => void;
}

export const WalletItem: FC<Props> = ({ wallet, active, onClick }) => {
  return (
    <Box
      row
      spacing="2"
      padding="2"
      as="button"
      className={cn(s.item, active && s.itemActive)}
      type="button"
      onClick={onClick}
    >
      <CryptoCurrencyIcon size="medium" currency={wallet.currency} />
      <Box grow row align="start" justify="between">
        <Box col align="start" textAlign="start">
          <span className={s.title}>{getCurrencyCodeSymbol(wallet.currency)}</span>
          <span className={s.description}>{wallet.name}</span>
        </Box>
        <Box col align="end">
          <span className={s.title}>
            <AmountFormat money={wallet.balance} />
          </span>
          {wallet.approximate.isZero() ? null : (
            <span className={s.description}>
              <Box as="span" textColor="secondary">
                &asymp;
              </Box>
              &nbsp;
              <MoneyFormat money={wallet.approximate} />
            </span>
          )}
        </Box>
      </Box>
    </Box>
  );
};
