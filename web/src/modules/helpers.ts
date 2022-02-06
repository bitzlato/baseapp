import { OrderCommon } from './types';
import { MakerType } from './user/history';

const makerTypeMap = {
  ask: 'sell' as const,
  bid: 'buy' as const,
};

export const kindToMakerType = (kind: keyof typeof makerTypeMap): MakerType => makerTypeMap[kind];

export function getActualPrice(order: OrderCommon) {
  return order.price ?? order.avg_price ?? '0';
}
