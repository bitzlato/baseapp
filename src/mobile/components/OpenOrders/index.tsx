import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { openOrdersFetchInterval } from '../../../api';
import { CloseIcon } from '../../../assets/images/CloseIcon';
import {
    ordersCancelAllFetch,
    ordersHistoryCancelFetch,
    selectOrdersHistory,
    selectShouldFetchCancelAll,
    selectShouldFetchCancelSingle,
    userOrdersHistoryFetch,
} from '../../../modules';
import { OrdersItem } from '../Orders/OrdersItem';

const OpenOrdersComponent: React.FC = () => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const orders = useSelector(selectOrdersHistory);
    const shouldFetchCancelAll = useSelector(selectShouldFetchCancelAll);
    const shouldFetchCancelSingle = useSelector(selectShouldFetchCancelSingle);
    const waitOrders = orders.filter(o => ['wait', 'pending'].includes(o.state));

    React.useEffect(() => {
        const fetchOrdersCb = () => {
            dispatch(userOrdersHistoryFetch({ pageIndex: 0, type: 'open', limit: 25 }));
        };
        fetchOrdersCb();
        const interval = openOrdersFetchInterval();
        const intervalId = interval > 0 ? window.setInterval(fetchOrdersCb, openOrdersFetchInterval()) : undefined;
        return () => clearInterval(intervalId);
    }, [dispatch]);

    const handleCancelAllOrders = () => {
        if (shouldFetchCancelAll) {
            dispatch(ordersCancelAllFetch());
        }
    };

    const handleCancelSingleOrder = (id: number) => () => {
        if (shouldFetchCancelAll && shouldFetchCancelSingle) {
            dispatch(ordersHistoryCancelFetch({
                id,
                type: 'open',
                list: waitOrders,
            }));
        }
    };

    return (
        <div className="pg-mobile-open-orders">
            <div className="pg-mobile-open-orders__header">
                <div className="pg-mobile-open-orders__header__block">
                    <span>{intl.formatMessage({id: 'page.mobile.orders.open.title'})}</span>
                </div>
                <div className="pg-mobile-open-orders__header__block" onClick={handleCancelAllOrders}>
                    <span>{intl.formatMessage({id: 'page.mobile.orders.cancelAll'})}</span>
                    <CloseIcon />
                </div>
            </div>
            <div className="pg-mobile-open-orders__content">
                {waitOrders.length ? (
                    waitOrders.map((order, index) => (
                        <OrdersItem
                            key={index}
                            order={order}
                            handleCancel={handleCancelSingleOrder}
                        />
                    ))
                ) : (
                    <span className="no-data">{intl.formatMessage({id: 'page.noDataToShow'})}</span>
                )}
            </div>
        </div>
    );
};

export const OpenOrders = React.memo(OpenOrdersComponent);
