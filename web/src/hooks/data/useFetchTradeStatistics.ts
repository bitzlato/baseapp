import { Money } from '@bitzlato/money-js';
import { useMemo } from 'react';
import { accountUrl } from 'web/src/api';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { TradeStat, TradeStatistics, TradeStats } from 'web/src/modules/user/profile/types';
import { useFetch, FetchResponse } from './useFetch';

export const useFetchTradeStatistics = () => {
  return useFetch<TradeStatistics>(`${accountUrl()}/user/trade_statistics`, fetchWithCreds);
};

export const useTradeStats = (): FetchResponse<TradeStats> => {
  const { data, error } = useFetchTradeStatistics();

  const tradeStats = useMemo((): TradeStats | undefined => {
    if (!data) {
      return undefined;
    }

    return {
      totalDeals: data.total_deals_count,
      totalPositiveFeedbacksCount: data.total_positive_feedbacks_count,
      totalNegativeFeedbacksCount: data.total_negative_feedbacks_count,
      stats: data.trade_statistics
        .reduce((acc: TradeStat[], tradeStatistics): TradeStat[] => {
          const totalDeals = tradeStatistics.success_deals;
          if (totalDeals > 0) {
            acc.push({
              totalDeals,
              totalMoney: Money.fromDecimal(tradeStatistics.total_amount, {
                code: tradeStatistics.cc_code,
                minorUnit: 8,
              }),
            });
          }

          return acc;
        }, [])
        .sort((a, b) => b.totalDeals - a.totalDeals),
    };
  }, [data]);

  return { data: tradeStats, error };
};
