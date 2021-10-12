import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOpenOrdersFetch } from 'src/hooks/useOpenOrdersFetch';
import { useT } from 'src/hooks/useT';
import { OrderCommon } from 'src/modules/types';
import { CloseIcon } from '../../../assets/images/CloseIcon';
import {
  openOrdersCancelFetch,
  ordersCancelAllFetch,
  selectCurrentMarket,
  selectOpenOrdersList,
} from '../../../modules';
import { OrdersItem } from '../Orders/OrdersItem';

const OpenOrdersComponent: React.FC = () => {
  const dispatch = useDispatch();
  const t = useT();
  const orders = useSelector(selectOpenOrdersList);
  const currentMarket = useSelector(selectCurrentMarket);

  useOpenOrdersFetch(currentMarket, true);

  const handleCancelAllOrders = () => {
    currentMarket && dispatch(ordersCancelAllFetch({ market: currentMarket.id }));
  };

  const handleCancelSingleOrder = (order: OrderCommon) => () => {
    dispatch(
      openOrdersCancelFetch({
        order,
        list: orders,
      }),
    );
  };

  return (
    <div className="pg-mobile-open-orders">
      <div className="pg-mobile-open-orders__header">
        <div className="pg-mobile-open-orders__header__block">
          <span>{t('page.mobile.orders.open.title')}</span>
        </div>
        <div className="pg-mobile-open-orders__header__block" onClick={handleCancelAllOrders}>
          <span>{t('page.mobile.orders.cancelAll')}</span>
          <CloseIcon />
        </div>
      </div>
      <div className="pg-mobile-open-orders__content">
        {orders.length ? (
          orders.map((order, index) => (
            <OrdersItem key={index} order={order} handleCancel={handleCancelSingleOrder} />
          ))
        ) : (
          <span className="no-data">{t('page.noDataToShow')}</span>
        )}
      </div>
    </div>
  );
};

export const OpenOrders = React.memo(OpenOrdersComponent);
