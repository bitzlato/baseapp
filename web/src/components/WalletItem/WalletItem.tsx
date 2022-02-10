import { FC } from 'react';
import cn from 'classnames';
import { Money } from '@bitzlato/money-js';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { Box } from 'src/components/Box/Box';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import s from './WalletItem.postcss';

export interface WalletItemData {
  name: string;
  currency: string;
  balance: Money;
  balanceP2P: Money | undefined;
  balanceMarket: Money | undefined;
  approximate: Money;
  locked: Money;
  icon: string;
  hasTransfer: boolean;
  index: number;
}

interface Props {
  active?: boolean | undefined;
  wallet: WalletItemData;
  onClick?: (() => void) | undefined;
  isMobileDevice?: boolean | undefined;
}

export const WalletItem: FC<Props> = ({ wallet, active, onClick, isMobileDevice }) => {
  const color = isMobileDevice ? 'primary' : undefined;
  return (
    <Box
      row
      spacing="2"
      padding={isMobileDevice ? '2X3' : '2'}
      as="button"
      className={cn(s.item, active && s.itemActive)}
      type="button"
      onClick={onClick}
    >
      <CryptoCurrencyIcon size="medium" currency={wallet.currency} />
      <Box grow row align="start" justify="between">
        <Box col align="start" textAlign="start">
          <Box textColor={color} className={s.title}>
            {getCurrencyCodeSymbol(wallet.currency)}
          </Box>
          <span className={s.description}>{wallet.name}</span>
        </Box>
        <Box col align="end">
          <Box className={s.title} textColor={color}>
            <AmountFormat money={wallet.balance} />
          </Box>
          {wallet.approximate.isZero() ? null : (
            <Box className={s.description} textColor={color}>
              <Box as="span" textColor="secondary">
                &asymp;
              </Box>
              &nbsp;
              <MoneyFormat money={wallet.approximate} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
