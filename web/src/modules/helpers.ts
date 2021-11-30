import { OrderCommon } from './types';
import { MakerType } from './user/history';

const makerTypeMap = {
  ask: 'sell',
  bid: 'buy',
};

export const kindToMakerType = (kind: string): MakerType => makerTypeMap[kind];

export function getActualPrice(order: OrderCommon) {
  return order.price ?? order.avg_price ?? '0';
}
