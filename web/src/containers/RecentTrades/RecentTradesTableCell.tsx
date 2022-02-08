import * as React from 'react';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { createMoneyWithoutCcy } from 'src/helpers/money';
import { DiffAmountFormat } from 'src/components/DiffAmountFormat/DiffAmountFormat';
import { setTradeColor } from '../../helpers';

const TradeTableCellComponent = (props: any) => {
  const { type, takerType, higlightedDate, amountFixed, amount, priceFixed, price, prevValue, id } =
    props;

  switch (type) {
    case 'date':
      return (
        <span style={{ color: setTradeColor(takerType).color }} key={id}>
          {higlightedDate}
        </span>
      );
    case 'amount':
      return (
        <span style={{ color: setTradeColor(takerType).color }}>
          <AmountFormat key={id} money={createMoneyWithoutCcy(amount, amountFixed)} />
        </span>
      );
    case 'price':
      return (
        <span style={{ color: setTradeColor(takerType).color }}>
          <DiffAmountFormat
            key={id}
            currentValue={createMoneyWithoutCcy(price, priceFixed)}
            prevValue={createMoneyWithoutCcy(prevValue, priceFixed)}
          />
        </span>
      );
    default:
      return <span />;
  }
};

const TradeTableCell = React.memo(TradeTableCellComponent);

export { TradeTableCell };
