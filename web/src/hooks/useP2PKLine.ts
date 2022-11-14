import { UTCTimestamp } from 'lightweight-charts';
import { useFetchP2PKLine } from 'web/src/hooks/data/peatio/useFetchP2PKLine';

const timeToLocal = (originalTime: UTCTimestamp): UTCTimestamp => {
  const d = new Date(originalTime * 1000);

  return (Date.UTC(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds(),
  ) / 1000) as UTCTimestamp;
};

export const useP2PKLine = (marketId: string) => {
  const { data } = useFetchP2PKLine(marketId);

  return data?.map(([time, open, high, low, close /* , volume */]) => ({
    time: timeToLocal(time),
    open,
    high,
    low,
    close,
    // volume,
  }));
};
