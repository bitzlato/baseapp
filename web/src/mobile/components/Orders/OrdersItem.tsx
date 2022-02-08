import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { FIXED_VOL_PRECISION } from 'src/constants';
import { OrderCommon } from 'src/modules/types';
import { MarketName } from 'src/components/MarketName/MarketName';
import { Label } from 'src/components/Label/Label';
import { Box } from 'src/components/Box';
import { getActualPrice } from 'src/modules/helpers';
import { createMoneyWithoutCcy } from 'src/helpers/money';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { selectMarkets } from '../../../modules';
import { localeDate, setTradeColor } from '../../../helpers';
import { CloseIcon } from '../../../assets/images/CloseIcon';

interface Props {
  order: OrderCommon;
  handleCancel: (order: OrderCommon) => () => void;
}

const OrdersItemComponent: React.FC<Props> = (props) => {
  const { order } = props;
  const intl = useIntl();
  const markets = useSelector(selectMarkets);

  const getOrderType = (side: string, type?: string) => {
    if (!side || !type) {
      return '';
    }

    return intl.formatMessage({ id: `page.mobile.orders.header.orderType.${side}.${type}` });
  };

  const currentMarket = (markets.length && markets.find((m) => m.id === order.market)) || {
    name: '',
    price_precision: 0,
    amount_precision: 0,
  };
  const marketName = currentMarket ? currentMarket.name : order.market;
  const orderType = getOrderType(order.side, order.ord_type);
  const filled = ((+(order.executed_volume || '0') / Number(order.origin_volume)) * 100).toFixed(2);
  const actualPrice = getActualPrice(order);
  const [orderDate, orderTime] = localeDate(
    order.updated_at ? order.updated_at : order.created_at,
    'fullDate',
  ).split(' ');

  return (
    <div key={order.id} className="pg-mobile-orders-item">
      <div className="pg-mobile-orders-item__row">
        <Box row spacing>
          <span style={{ color: setTradeColor(order.side).color }}>{orderType}</span>
          <Label color="primary">
            <MarketName name={marketName} />
          </Label>
        </Box>
        <Box row spacing>
          <span>{orderDate}</span>
          <Label color="primary">{orderTime}</Label>
        </Box>
      </div>
      <div className="pg-mobile-orders-item__row">
        <div className="pg-mobile-orders-item__row__block">
          <span>{intl.formatMessage({ id: 'page.mobile.orders.header.filled' })}</span>
          <div className="pg-mobile-orders-item__row__block__value">
            <Box textColor={order.side === 'buy' ? 'bid' : 'ask'}>
              <AmountFormat money={createMoneyWithoutCcy(filled, FIXED_VOL_PRECISION)} />%
            </Box>
          </div>
        </div>
        <div className="pg-mobile-orders-item__row__block">
          <div>
            <span>{intl.formatMessage({ id: 'page.mobile.orders.header.amount' })}</span>
            <span className="pg-mobile-orders-item__row__block__value">
              <AmountFormat
                money={createMoneyWithoutCcy(
                  order.remaining_volume,
                  currentMarket.amount_precision,
                )}
              />
            </span>
          </div>
          <div className="pg-mobile-orders-item__second__row">
            <span>{intl.formatMessage({ id: 'page.mobile.orders.header.volume' })}</span>
            <span className="pg-mobile-orders-item__row__block__value">
              <AmountFormat
                money={createMoneyWithoutCcy(
                  +order.remaining_volume * +actualPrice,
                  currentMarket.price_precision,
                )}
              />
            </span>
          </div>
        </div>
        <div className="pg-mobile-orders-item__row__block">
          <div>
            <span>{intl.formatMessage({ id: 'page.mobile.orders.header.price' })}</span>
            <span className="pg-mobile-orders-item__row__block__value">
              <AmountFormat
                money={createMoneyWithoutCcy(actualPrice, currentMarket.price_precision)}
              />
            </span>
          </div>
          <div className="pg-mobile-orders-item__second__row">
            <span>{intl.formatMessage({ id: 'page.mobile.orders.header.trigger' })}</span>
            <span className="pg-mobile-orders-item__row__block__value">
              {order.trigger_price ? (
                <AmountFormat
                  money={createMoneyWithoutCcy(order.trigger_price, currentMarket.price_precision)}
                />
              ) : (
                '-'
              )}
            </span>
          </div>
        </div>
        <div className="pg-mobile-orders-item__row__button__wrapper">
          {order.state === 'wait' ? (
            <div className="pg-mobile-orders-item__row__button" onClick={props.handleCancel(order)}>
              <span>{intl.formatMessage({ id: 'page.mobile.orders.header.cancel' })}</span>
              <CloseIcon />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const OrdersItem = React.memo(OrdersItemComponent);
