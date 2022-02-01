import * as React from 'react';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { createMoneyWithoutCcy } from 'src/helpers/money';
import { localeDate } from '../../../helpers';

const RowItemComponent = (props) => {
  return (
    <div className="cr-mobile-table-row">
      <div className="cr-mobile-table-row__amount">
        <div className="cr-mobile-table-row__amount-value">
          <AmountFormat money={createMoneyWithoutCcy(props.amount, props.fixed)} />
        </div>
        <span className="cr-mobile-table-row__amount-currency">{props.currency}</span>
      </div>
      <div className="cr-mobile-table-row__date">{localeDate(props.createdAt, 'fullDate')}</div>
    </div>
  );
};

const RowItem = React.memo(RowItemComponent);

export { RowItem };
