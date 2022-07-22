import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { AmountFormat } from 'web/src/components/AmountFormat/AmountFormat';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { Box } from 'web/src/components/ui/Box';
import { BalanceBrand } from 'web/src/screens/BalancesScreen/BalanceBrand';
import { Balance } from 'web/src/types/balances.types';
import * as s from './BalanceItem.css';

interface Props {
  balance?: Balance | undefined;
  forceActive?: boolean | undefined;
}

export const BalanceItem: FC<Props> = ({ balance, forceActive }) => {
  if (!balance) {
    return (
      <Box className={s.item.base}>
        <BalanceBrand />
      </Box>
    );
  }

  return (
    <NavLink
      className={s.item.base}
      activeClassName={s.item.active}
      isActive={forceActive ? () => forceActive : undefined}
      to={`/balances/${balance.cryptoCurrency.code}`}
    >
      <BalanceBrand balance={balance} />
      <Box as="span" textAlign="right">
        <Box as="span" fontSize="large" fontWeight="strong">
          {balance.totalBalance ? <AmountFormat money={balance.totalBalance} /> : '–'}
        </Box>
        <br />
        <Box as="span" fontSize="medium">
          {balance.totalBalanceInFiat && (
            <>
              ≈ <MoneyFormat money={balance.totalBalanceInFiat} />
            </>
          )}
        </Box>
      </Box>
    </NavLink>
  );
};
