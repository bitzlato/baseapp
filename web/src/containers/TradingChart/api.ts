import axios from 'axios';
import { TradingChartComponent } from '.';
import { finexUrl, isFinexEnabled, tradeUrl } from '../../api/config';
import { LibrarySymbolInfo } from '../../charting_library/datafeed-api';
import { buildQueryString, getTimestampPeriod } from '../../helpers';
import {
  klineArrayToObject,
  KlineEvent,
  KlineState,
  klineUpdatePeriod,
  klineUpdateTimeRange,
} from '../../modules';
import { Market } from '../../modules/public/markets';
import { periodMinutesToString } from '../../modules/public/ranger/helpers';
import { store } from '../../store';

export const print = (...x: string[]) => window.console.log.apply(null, ['>>>> TC', ...x]);
export interface CurrentKlineSubscription {
  marketId?: string;
  periodString?: string;
}

const getHistoryApi = (): string => (isFinexEnabled() ? finexUrl() : tradeUrl());

const makeHistoryUrl = (market: string, resolution: number, from: number, to: number) => {
  const payload = {
    period: resolution,
    time_from: getTimestampPeriod(from, resolution),
    time_to: getTimestampPeriod(to, resolution),
  };
  let endPoint = `/public/markets/${market}/k-line`;

  if (payload) {
    endPoint = `${endPoint}?${buildQueryString(payload)}`;
  }

  return `${getHistoryApi()}${endPoint}`;
};

const resolutionToSeconds = (r: string): number => {
  const minutes = parseInt(r, 10);
  if (r === '1D') {
    return 1440;
  }
  if (r === 'D') {
    return 4320;
  }
  if (!isNaN(minutes)) {
    return minutes;
  }
  return 1;
};

const config = {
  supports_timescale_marks: true,
  supports_time: false,
  supported_resolutions: ['1', '5', '15', '30', '60', '120', '240', '360', '720', 'd', '3d'],
};

export const dataFeedObject = (tradingChart: TradingChartComponent, markets: Market[]) => {
  const dataFeed = {
    onReady: (
      cb: (arg0: {
        supports_timescale_marks: boolean;
        supports_time: boolean;
        supported_resolutions: string[];
      }) => void,
    ) => {
      setTimeout(() => cb(config), 0);
    },
    searchSymbols: (
      _userInput: any,
      _exchange: any,
      _symbolType: any,
      onResultReadyCallback: (
        arg0: {
          symbol: string;
          full_name: string;
          description: string;
          exchange: string;
          ticker: string;
          type: string;
          currency_code: string;
        }[],
      ) => void,
    ) => {
      const symbols = markets.map((m) => ({
        symbol: m.id,
        full_name: m.name,
        description: m.name,
        exchange: 'Cryptobase',
        ticker: m.id,
        type: 'bitcoin',
        currency_code: m.quote_unit.toUpperCase(),
      }));
      setTimeout(() => onResultReadyCallback(symbols), 0);
    },
    resolveSymbol: (
      symbolName: string,
      onSymbolResolvedCallback: (arg0: any) => void,
      onResolveErrorCallback: (arg0: string) => void,
    ) => {
      const symbol = markets.find((m) => m.id === symbolName || m.name === symbolName);

      if (!symbol) {
        return setTimeout(() => onResolveErrorCallback('Symbol not found'), 0);
      }

      const symbolStub = {
        name: symbol.name,
        currency_code: symbol.quote_unit.toUpperCase(),
        description: '',
        type: 'bitcoin',
        session: '24x7',
        timezone: 'Etc/UTC',
        ticker: symbol.id,
        minmov: 1,
        pricescale: 10 ** symbol.price_precision,
        has_intraday: true,
        intraday_multipliers: ['1', '5', '15', '30', '60', '120', '240', '360', '720', 'd', '3d'],
        supported_resolutions: ['1', '5', '15', '30', '60', '120', '240', '360', '720', 'd', '3d'],
        volume_precision: 8,
        data_status: 'streaming',
      };

      return setTimeout(() => onSymbolResolvedCallback(symbolStub), 0);
    },
    getTimescaleMarks: async () => {
      const range = tradingChart.tvWidget!.activeChart().getVisibleRange();
      const period = tradingChart.tvWidget!.activeChart().resolution();
      store.dispatch(klineUpdateTimeRange(range));
      store.dispatch(klineUpdatePeriod(period));
    },
    getBars: async (
      symbolInfo: LibrarySymbolInfo,
      resolution: string,
      from: number,
      to: number,
      onHistoryCallback: (arg0: never[], arg1: { noData: boolean }) => any,
    ) => {
      const url = makeHistoryUrl(
        symbolInfo.ticker || symbolInfo.name.toLowerCase(),
        resolutionToSeconds(resolution),
        from,
        to,
      );

      return axios
        .get(url)
        .then(({ data }) => {
          if (data.length < 1) {
            return onHistoryCallback([], { noData: true });
          }
          const bars = data.map(klineArrayToObject);

          return onHistoryCallback(bars, { noData: false });
        })
        .catch(() => {
          return onHistoryCallback([], { noData: true });
        });
    },
    subscribeBars: (
      symbolInfo: LibrarySymbolInfo,
      resolution: string,
      onRealtimeCallback: (arg0: KlineEvent) => void,
    ) => {
      dataFeed.onRealtimeCallback = ((kline: KlineState) => {
        if (
          kline.last &&
          kline.marketId === tradingChart.currentKlineSubscription.marketId &&
          kline.period === tradingChart.currentKlineSubscription.periodString
        ) {
          onRealtimeCallback(kline.last);
        }
      }) as any;
      const marketId: string = symbolInfo.ticker!;
      const periodString = periodMinutesToString(resolutionToSeconds(resolution));

      tradingChart.props.subscribeKline(marketId, periodString);
      tradingChart.currentKlineSubscription = {
        marketId,
        periodString,
      };
    },
    unsubscribeBars: () => {
      const { marketId, periodString } = tradingChart.currentKlineSubscription;
      if (marketId && periodString) {
        tradingChart.props.unSubscribeKline(marketId, periodString);
      }
      tradingChart.currentKlineSubscription = {};
    },
    onRealtimeCallback: (_kline: KlineState) => {
      // window.console.log(`default onRealtimeCallback called with ${JSON.stringify(bar)}`);
    },
  };

  return dataFeed;
};
