import { OrderType } from 'src/components/Order';

const ORDER_TYPES_WITH_TRIGGER: OrderType[] = [
  'Stop-loss',
  'Take-profit',
  'Stop-limit',
  'Take-limit',
];

export function isTrigger(orderType: OrderType): boolean {
  return ORDER_TYPES_WITH_TRIGGER.includes(orderType);
}

const ORDER_TYPES_WITH_LIMIT: OrderType[] = ['Limit', 'Stop-limit', 'Take-limit'];

export function isLimit(orderType: OrderType): boolean {
  return ORDER_TYPES_WITH_LIMIT.includes(orderType);
}

const TRIGGER_BUY_PRICE_ADJUSTED_TYPES: OrderType[] = ['Stop-loss', 'Take-profit'];

export function isTriggerByPrice(orderType: OrderType): boolean {
  return TRIGGER_BUY_PRICE_ADJUSTED_TYPES.includes(orderType);
}

export function isMarket(orderType: OrderType): boolean {
  return orderType === 'Market';
}
