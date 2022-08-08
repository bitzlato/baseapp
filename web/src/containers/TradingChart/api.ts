import axios from 'axios';
import {
  ChartingLibraryWidgetOptions,
  DatafeedConfiguration,
  IChartingLibraryWidget,
} from 'web/src/charting_library/charting_library.min';
import {
  rangerSubscribeKlineMarket,
  rangerUnsubscribeKlineMarket,
} from 'web/src/modules/public/ranger/actions';
import { finexUrl, isFinexEnabled, tradeUrl } from '../../api/config';
import { LibrarySymbolInfo, SearchSymbolResultItem } from '../../charting_library/datafeed-api';
import { buildQueryString, getTimestampPeriod } from '../../helpers';
import {
  klineArrayToObject,
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

export type MarketKind = 'k-line' | 'p2p-k-line';

export type TradingViewMarket = Pick<Market, 'id' | 'name' | 'quote_unit' | 'price_precision'>;

const makeHistoryUrl = (
  market: string,
  resolution: number,
  from: number,
  to: number,
  kind?: MarketKind,
) => {
  const payload = {
    period: resolution,
    time_from: getTimestampPeriod(from, resolution),
    time_to: getTimestampPeriod(to, resolution),
  };
  const endPoint = `/public/markets/${market}/${kind ?? 'k-line'}?${buildQueryString(payload)}`;
  return `${isFinexEnabled() ? finexUrl() : tradeUrl()}${endPoint}`;
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

const config: DatafeedConfiguration = {
  supports_timescale_marks: true,
  supports_time: false,
  supported_resolutions: ['1', '5', '15', '30', '60', '120', '240', '360', '720', 'd', '3d'],
};

interface Props {
  markets: TradingViewMarket[];
  tvWidget: () => IChartingLibraryWidget | null;
  subscribeKline: typeof rangerSubscribeKlineMarket;
  unSubscribeKline: typeof rangerUnsubscribeKlineMarket;
  marketKind?: MarketKind | undefined;
}

export type DatafeedExt = ChartingLibraryWidgetOptions['datafeed'] & {
  currentKlineSubscription: CurrentKlineSubscription;
  onRealtimeCallback: (_kline: KlineState) => void;
};

export const dataFeedObject = (props: Props) => {
  const dataFeed: DatafeedExt = {
    currentKlineSubscription: {},

    onReady: (cb) => {
      setTimeout(() => cb(config), 0);
    },

    searchSymbols: (_userInput, _exchange, _symbolType, onResultReadyCallback) => {
      const symbols = props.markets.map<SearchSymbolResultItem>((m) => ({
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

    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
      const market = props.markets.find((m) => m.id === symbolName || m.name === symbolName);

      if (!market) {
        return setTimeout(() => onResolveErrorCallback('Symbol not found'), 0);
      }

      const symbolStub: LibrarySymbolInfo = {
        name: market.name,
        currency_code: market.quote_unit.toUpperCase(),
        description: '',
        type: 'bitcoin',
        session: '24x7',
        timezone: 'Etc/UTC',
        ticker: market.id,
        minmov: 1,
        pricescale: 10 ** market.price_precision,
        has_intraday: true,
        intraday_multipliers: ['1', '5', '15', '30', '60', '120', '240', '360', '720', 'd', '3d'],
        supported_resolutions: ['1', '5', '15', '30', '60', '120', '240', '360', '720', 'd', '3d'],
        volume_precision: 8,
        data_status: 'streaming',
        full_name: '',
        exchange: '',
        listed_exchange: '',
        format: 'price',
      };

      return setTimeout(() => onSymbolResolvedCallback(symbolStub), 0);
    },

    getTimescaleMarks: async () => {
      const w = props.tvWidget();
      if (w) {
        const range = w.activeChart().getVisibleRange();
        const period = w.activeChart().resolution();
        store.dispatch(klineUpdateTimeRange(range));
        store.dispatch(klineUpdatePeriod(period));
      }
    },

    getBars: async (symbolInfo, resolution, from, to, onHistoryCallback) => {
      const url = makeHistoryUrl(
        symbolInfo.ticker || symbolInfo.name.toLowerCase(),
        resolutionToSeconds(resolution),
        from,
        to,
        props.marketKind,
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

    subscribeBars: (symbolInfo, resolution, onRealtimeCallback) => {
      dataFeed.onRealtimeCallback = (kline: KlineState) => {
        if (
          kline.last &&
          kline.marketId === dataFeed.currentKlineSubscription.marketId &&
          kline.period === dataFeed.currentKlineSubscription.periodString
        ) {
          onRealtimeCallback(kline.last);
        }
      };
      const marketId: string = symbolInfo.ticker!;
      const periodString = periodMinutesToString(resolutionToSeconds(resolution));

      props.subscribeKline(marketId, periodString);
      dataFeed.currentKlineSubscription = {
        marketId,
        periodString,
      };
    },

    unsubscribeBars: () => {
      const { marketId, periodString } = dataFeed.currentKlineSubscription;
      if (marketId && periodString) {
        props.unSubscribeKline(marketId, periodString);
      }
      dataFeed.currentKlineSubscription = {};
    },

    onRealtimeCallback: (_kline: KlineState) => {
      // window.console.log(`default onRealtimeCallback called with ${JSON.stringify(bar)}`);
    },
  };

  return dataFeed;
};
