import { OrderCommon, OrderEvent } from '../../types';

export const convertOrderEvent = (orderEvent: OrderEvent): OrderCommon => {
  const { at, ...order } = orderEvent;

  return {
    ...order,
    ord_type: order.order_type || order.ord_type,
    created_at: typeof order.created_at === 'number' ? order.created_at * 1000 : order.created_at,
    updated_at: typeof order.updated_at === 'number' ? order.updated_at * 1000 : order.updated_at,
  };
};

export const insertOrUpdate = (list: OrderCommon[], order: OrderCommon): OrderCommon[] => {
  switch (order.state) {
    case 'pending':
    case 'wait':
      if (!list.find((d) => isSame(d, order))) {
        return [{ ...order }, ...list];
      }
      return list.map((d) => (isSame(d, order) ? { ...order } : d));

    default:
      return list.filter((d) => !isSame(d, order));
  }
};

function isSame(a: OrderCommon, b: OrderCommon): boolean {
  return (a.uuid !== undefined && b.uuid !== undefined && a.uuid === b.uuid) || a.id === b.id;
}
