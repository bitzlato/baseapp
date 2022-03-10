import { Money } from '@bitzlato/money-js';
import { useMemo } from 'react';
import { accountUrl } from 'web/src/api';
import { fetcher } from 'web/src/helpers/fetcher';
import { TradeStat, TradeStatistics, TradeStats } from 'web/src/modules/user/profile/types';
import { useFetcher, FetcherResponse } from './useFetcher';

export const useFetchTradeStatistics = () => {
  return useFetcher<TradeStatistics>(`${accountUrl()}/user/trade_statistics`, (url) =>
    fetcher(url, {
      credentials: 'include',
    }),
  );
};

export const useTradeStats = (): FetcherResponse<TradeStats> => {
  const { data, error } = useFetchTradeStatistics();

  const tradeStats = useMemo((): TradeStats | undefined => {
    if (!data) {
      return undefined;
    }

    return {
      totalDeals: data.total_deals_count,
      totalPositiveFeedbacksCount: data.total_positive_feedbacks_count,
      totalNegativeFeedbacksCount: data.total_negative_feedbacks_count,
      stats: data.trade_statistics.map(
        (tradeStatistics): TradeStat => ({
          totalDeals: tradeStatistics.total_count,
          totalMoney: Money.fromDecimal(tradeStatistics.total_amount, {
            code: tradeStatistics.cc_code,
            minorUnit: 8,
          }),
        }),
      ),
    };
  }, [data]);

  return { data: tradeStats, error };
};
