import { FC } from 'react';
import cn from 'classnames';
import { Money } from '@bitzlato/money-js';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { Box } from 'src/components/Box/Box';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import s from './WalletItem.postcss';

export interface WalletItemData {
  name: string;
  currency: string;
  balanceTotal: Money;
  balanceP2P: Money | undefined;
  balanceMarket: Money | undefined;
  approximate: Money;
  locked: Money;
  hasTransfer: boolean;
  hasGift: boolean;
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
      <CryptoCurrencyIcon size="9x" currency={wallet.currency} />
      <Box grow row align="start" justify="between">
        <Box col align="start" textAlign="start">
          <Box textColor={color} textSize="title">
            {getCurrencyCodeSymbol(wallet.currency)}
          </Box>
          <Box textSize="description">{wallet.name}</Box>
        </Box>
        <Box col align="end">
          <Box textSize="title" textColor={color}>
            <AmountFormat money={wallet.balanceTotal} />
          </Box>
          {wallet.approximate.isZero() ? null : (
            <Box textSize="description" textColor={color}>
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
