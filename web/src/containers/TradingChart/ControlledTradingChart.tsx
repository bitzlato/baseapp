import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IChartingLibraryWidget, widget } from '../../charting_library/charting_library.min';
import { stdTimezoneOffset } from '../../helpers';
import { selectCurrentColorTheme, selectCurrentLanguage, selectKline } from '../../modules';
import {
  rangerSubscribeKlineMarket,
  rangerUnsubscribeKlineMarket,
} from '../../modules/public/ranger';
import { periodStringToMinutes } from '../../modules/public/ranger/helpers';
import { DatafeedExt, dataFeedObject, MarketKind, print, TradingViewMarket } from './api';
import { isLangIncluded, widgetOptions, widgetParams } from './config';
import { getTradingChartTimezone } from './timezones';

interface Props {
  markets: TradingViewMarket[];
  currentMarket: string | undefined;
  marketKind?: MarketKind | undefined;
}

export const ControlledTradingChart: FC<Props> = ({ marketKind, markets, currentMarket }) => {
  const dispatch = useDispatch();

  const colorTheme = useSelector(selectCurrentColorTheme);
  const kline = useSelector(selectKline);
  const lang = useSelector(selectCurrentLanguage);

  const ref = useRef<{ widget: IChartingLibraryWidget | null; datafeed: DatafeedExt | null }>({
    widget: null,
    datafeed: null,
  });

  const removeChart = () => {
    if (!ref.current.widget) return;
    try {
      ref.current.widget.remove();
      ref.current.widget = null;
      ref.current.datafeed = null;
    } catch (error) {
      window.console.log(`TradingChart unmount failed (Rebuild chart): ${error}`);
    }
  };

  const setChart = () => {
    if (!currentMarket) return;

    removeChart();

    const currentTimeOffset = new Date().getTimezoneOffset();
    const clockPeriod = currentTimeOffset === stdTimezoneOffset(new Date()) ? 'STD' : 'DST';

    if (kline.period) {
      widgetParams.interval = String(periodStringToMinutes(kline.period));
    }

    ref.current.datafeed = dataFeedObject({
      markets,
      marketKind,
      tvWidget: () => ref.current.widget,
      subscribeKline: (...args) => dispatch(rangerSubscribeKlineMarket(...args)),
      unSubscribeKline: (...args) => dispatch(rangerUnsubscribeKlineMarket(...args)),
    });

    // eslint-disable-next-line new-cap
    ref.current.widget = new widget({
      symbol: currentMarket,
      datafeed: ref.current.datafeed,
      interval: widgetParams.interval,
      container_id: widgetParams.containerId,
      locale: isLangIncluded(lang) ? lang : 'en',
      timezone: getTradingChartTimezone(currentTimeOffset, clockPeriod),
      ...widgetOptions(colorTheme),
    });

    let previousRange = { from: 0, to: 0 };
    if (kline.range.from !== 0 && kline.range.to !== 0) {
      previousRange = kline.range;
    }

    let previousResolution = '';
    if (kline.period) {
      previousResolution = kline.period;
    }

    ref.current.widget.onChartReady(() => {
      // ref.current.widget!.activeChart().executeActionById('drawingToolbarAction');

      ref.current.widget!.activeChart().setSymbol(currentMarket, () => {
        print('Symbol set', currentMarket);
      });

      if (previousRange.from !== 0 && previousRange.to !== 0) {
        ref.current.widget!.activeChart().setVisibleRange(previousRange);
      }

      if (previousResolution) {
        ref.current
          .widget!.activeChart()
          .setResolution(String(periodStringToMinutes(previousResolution)), () => {
            print('Resolution set', previousResolution);
          });
      }
    });
  };

  const updateChart = () => {
    if (ref.current.widget && currentMarket) {
      ref.current.widget.onChartReady(() => {
        ref.current.widget?.activeChart().setSymbol(currentMarket, () => {
          print('Symbol set', currentMarket);
        });
      });
    }
  };

  useEffect(() => ref.current.datafeed?.onRealtimeCallback(kline), [kline]);

  useEffect(() => {
    if (ref.current.widget) {
      setChart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorTheme, markets, marketKind]);

  useEffect(() => {
    if (ref.current.widget) {
      updateChart();
    } else {
      setChart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMarket]);

  useEffect(() => removeChart, []);

  return <div id={widgetParams.containerId} className="pg-trading-chart" />;
};
