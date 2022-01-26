import * as React from 'react';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { DiffAmountFormat } from 'src/components/DiffAmountFormat/DiffAmountFormat';
import { createMoneyWithoutCcy } from 'src/helpers/money';

const OrderBookTableRowComponent = (props) => {
  const { type, fixed, prevValue, price, total } = props;

  if (type === 'price') {
    return (
      <span>
        <DiffAmountFormat currentValue={createMoneyWithoutCcy(price, fixed)} prevValue={createMoneyWithoutCcy(prevValue, fixed)} />
      </span>
    );
  }

  return <AmountFormat money={createMoneyWithoutCcy(total, fixed)} />;
};

export const OrderBookTableRow = React.memo(OrderBookTableRowComponent);
